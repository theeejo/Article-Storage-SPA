import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import mysql from 'mysql2/promise';
import { USER, PASSWORD } from './Const.js';
import db from './config.js';
import Article from './models/Article.js';
import Reference from './models/Reference.js';
import LikeOperator from './Operators.js';

import fs from 'fs';
('use strict');

const app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

// Create DB connection
var conn;
mysql
  .createConnection({
    user: USER,
    password: PASSWORD,
  })
  .then((connection) => {
    conn = connection;
    return connection.query('CREATE DATABASE IF NOT EXISTS storage');
  })
  .then(() => {
    return conn.end();
  })
  .catch((err) => {
    console.log(err);
  });

// One to many relationship
Article.hasMany(Reference, { as: 'Referinte', foreignKey: 'ArticleID' });
Reference.belongsTo(Article, { foreignKey: 'ArticleID' });

//--------------------GET---------------------------------
// Get all articles (no references)
async function getArticles() {
  return await Article.findAll();
}
router.route('/getArticles').get(async (req, res) => {
  try {
    return res.json(await getArticles());
  } catch (err) {
    console.log(err.message);
  }
});

// Get article by ID
async function getArticleByID(id) {
  return await Article.findOne({
    where: id ? { ArticleID: id } : undefined,
  });
}
router.route('/getArticleByID/:id').get(async (req, res) => {
  try {
    return res.json(await getArticleByID(req.params.id));
  } catch (err) {
    console.log(err.message);
  }
});

// Get all articles + their references
async function getArticlesFull() {
  return await Article.findAll({ include: ['Referinte'] });
}
router.route('/getArticlesFull').get(async (req, res) => {
  try {
    return res.json(await getArticlesFull());
  } catch (err) {
    console.log(err.message);
  }
});

// Get all references
async function getReferences() {
  return await Reference.findAll();
}
router.route('/getReferences').get(async (req, res) => {
  try {
    return res.json(await getReferences());
  } catch (err) {
    console.log(err.message);
  }
});

// Get the references for a given article (by ArticleID)
async function getReferencesByArticle(idArticle) {
  if (!(await getArticleByID(idArticle))) {
    console.log('Could not find article.');
    return;
  }
  return await Reference.findAll({
    include: [
      {
        model: Article,
        attributes: ['ArticleTitlu'],
        where: idArticle ? { ArticleID: idArticle } : undefined,
      },
    ],
  });
}
router.route('/getReferencesByArticle/:idArticle').get(async (req, res) => {
  try {
    return res.json(await getReferencesByArticle(req.params.idArticle));
  } catch (err) {
    console.log(err.message);
  }
});

// Get a specific article's reference (by ArticleID, ReferenceID)
async function getReferenceByArticle(idArticle, idReference) {
  if (!(await getArticleByID(idArticle))) {
    console.log('Could not find article.');
    return;
  }
  return await Reference.findOne({
    include: [
      {
        model: Article,
        attributes: ['ArticleTitlu'],
        where: idArticle ? { ArticleID: idArticle } : undefined,
      },
    ],
    where: idReference ? { ReferenceID: idReference } : undefined,
  });
}
router
  .route('/getReferenceByArticle/:idArticle/:idReference')
  .get(async (req, res) => {
    try {
      return res.json(
        await getReferenceByArticle(
          req.params.idArticle,
          req.params.idReference
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  });

// Filter articles by 2 search fields (title/titlu, summary/rezumat)
async function getArticlesFiltered(filterQuery) {
  let whereClause = {};
  if (filterQuery.titlu) {
    whereClause.ArticleTitlu = {
      [LikeOperator]: `%${filterQuery.titlu}%`,
    };
  }
  if (filterQuery.rezumat) {
    whereClause.ArticleRezumat = {
      [LikeOperator]: `%${filterQuery.rezumat}%`,
    };
  }
  return await Article.findAll({ where: whereClause });
}
router.route('/getArticlesFiltered').get(async (req, res) => {
  // http://localhost:8080/getArticlesFiltered?titlu=3   OR   http://localhost:8080/getArticlesFiltered?rezumat=3   OR  http://localhost:8080/getArticlesFiltered?titlu=3&rezumat=rezumat (with both fields)
  try {
    return res.json(await getArticlesFiltered(req.query));
  } catch (err) {
    console.log(err.message);
  }
});

// Sort articles (ASC) by title/titlu
async function getArticlesSortedByTitle() {
  return await Article.findAll({ order: [['ArticleTitlu', 'ASC']] });
}
router.route('/getArticlesSortedByTitle').get(async (req, res) => {
  try {
    return res.json(await getArticlesSortedByTitle());
  } catch (err) {
    console.log(err.message);
  }
});

// Sort articles (DESC) by publication date
async function getArticlesSortedByDate() {
  return await Article.findAll({ order: [['ArticleData', 'DESC']] });
}
router.route('/getArticlesSortedByDate').get(async (req, res) => {
  try {
    return res.json(await getArticlesSortedByDate());
  } catch (err) {
    console.log(err.message);
  }
});

//----------------POST-----------------------------------
// Add article
async function createArticle(article) {
  return await Article.create(article);
}
router.route('/addArticle').post(async (req, res) => {
  try {
    return res.status(201).json(await createArticle(req.body));
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error_message: 'Could not insert article.',
    });
  }
});

// Add reference
async function createReference(reference, idArticle) {
  if (!(await getArticleByID(idArticle))) {
    console.log('Could not find article');
    return;
  }
  reference.ArticleID = idArticle;
  return await Reference.create(reference);
}
router.route('/addReference/:idArticle').post(async (req, res) => {
  try {
    return res
      .status(201)
      .json(await createReference(req.body, req.params.idArticle));
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ error_message: 'Could not insert reference.' });
  }
});

//---------------------PUT--------------------
// Update article
async function updateArticle(updatedArticle, idArticle) {
  if (parseInt(idArticle) !== updatedArticle.ArticleID) {
    console.log('IDs do not match.');
    return;
  }
  var article = await getArticleByID(idArticle);
  if (!article) {
    console.log('Could not find article.');
    return;
  }

  return await article.update(updatedArticle);
}
router.route('/updateArticle/:idArticle').put(async (req, res) => {
  try {
    return res.json(await updateArticle(req.body, req.params.idArticle));
  } catch (err) {
    console.log(err.message);
  }
});

// Update reference
async function updateReference(updatedReference, idArticle, idReference) {
  if (parseInt(idReference) !== updatedReference.ReferenceID) {
    console.log('IDs do not match.');
    return;
  }

  var article = await getArticleByID(idArticle);
  if (!article) {
    console.log('Could not find article.');
    return;
  }

  var reference = await getReferenceByArticle(idArticle, idReference);
  if (!reference) {
    console.log('Could not find reference.');
    return;
  }
  return await reference.update(updatedReference);
}
router
  .route('/updateReference/:idArticle/:idReference')
  .put(async (req, res) => {
    try {
      return res.json(
        await updateReference(
          req.body,
          req.params.idArticle,
          req.params.idReference
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  });

//-----------------DELETE-------------------------
// Delete an article (+ its references)
async function deleteArticle(idArticle) {
  let articleToBeDeleted = await getArticleByID(idArticle);

  if (!articleToBeDeleted) {
    console.log('Could not find article.');
    return;
  }

  return await articleToBeDeleted.destroy();
}
router.route('/deleteArticle/:idArticle').delete(async (req, res) => {
  try {
    return res.json(await deleteArticle(req.params.idArticle));
  } catch (err) {
    console.log(err.message);
  }
});

// Delete a reference
async function deleteReference(idArticle, idReference) {
  let article = await getArticleByID(idArticle);
  if (!article) {
    console.log('Could not find article.');
    return;
  }

  let referenceToBeDeleted = await getReferenceByArticle(
    idArticle,
    idReference
  );

  if (!referenceToBeDeleted) {
    console.log('Could not find reference.');
    return;
  }

  return await referenceToBeDeleted.destroy();
}
router
  .route('/deleteReference/:idArticle/:idReference')
  .delete(async (req, res) => {
    try {
      return res.json(
        await deleteReference(req.params.idArticle, req.params.idReference)
      );
    } catch (err) {
      console.log(err.message);
    }
  });

//---------------------------------------

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  await db.sync({ alter: true });
  console.log('DB synchronized successfully.');
});
console.log(`Server running on http://localhost:${port}.`);

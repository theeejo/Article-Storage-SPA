const link = 'http://localhost:8080';

const routeGetArticles = link + '/getArticles';
const routeGetArticleByID = link + '/getArticleByID';
const routeGetArticlesFull = link + '/getArticlesFull';
const routeGetReferences = link + '/getReferences';
const routeGetReferencesByArticle = link + '/getReferencesByArticle';
const routeGetReferenceByArticle = link + '/getReferenceByArticle';
const routeGetArticlesFiltered = link + '/getArticlesFiltered';
const routeGetArticlesSortedByTitle = link + '/getArticlesSortedByTitle';
const routeGetArticlesSortedByDate = link + '/getArticlesSortedByDate';


const routePostArticle = link + '/addArticle';
const routePostReference = link + '/addReference';

const routePutArticle = link + '/updateArticle';
const routePutReference = link + '/updateReference';

const routeDeleteArticle = link + '/deleteArticle';
const routeDeleteReference = link + '/deleteReference';

export {
  routeGetArticles,
  routeGetArticleByID,
  routeGetArticlesFull,
  routeGetReferences,
  routeGetReferencesByArticle,
  routeGetReferenceByArticle,
  routeGetArticlesFiltered,
  routeGetArticlesSortedByTitle,
  routeGetArticlesSortedByDate,
  routePostArticle,
  routePostReference,
  routePutArticle,
  routePutReference,
  routeDeleteArticle,
  routeDeleteReference,
};

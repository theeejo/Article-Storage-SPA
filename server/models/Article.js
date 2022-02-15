import db from '../config.js';
import { Sequelize } from 'sequelize';

const Article = db.define('Article', {
  ArticleID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ArticleTitlu: {
    type: Sequelize.STRING,
    validate: {
      len: {
        args: [5, 150],
        msg: 'Title has to be between 5 and 150 characters!',
      },
    },
    allowNull: false,
  },
  ArticleRezumat: {
    type: Sequelize.STRING,
    validate: {
      len: {
        args: [10, 200],
        msg: 'Summary has to be between 10 and 200 characters!',
      },
    },
    allowNull: false,
  },
  ArticleData: {
    type: Sequelize.DATEONLY,
    validate: {
      isDate: {
        msg: 'Date must have the YYYY-MM-DD format.',
      },
      isBefore: '2023-01-01',
    },
    allowNull: false,
  },
});

export default Article;

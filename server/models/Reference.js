import db from '../config.js';
import Sequelize from 'sequelize';

const Reference = db.define('Reference', {
  ReferenceID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ReferenceTitlu: {
    type: Sequelize.STRING,
    validate: {
      len: {
        args: [5, 150],
        msg: 'Title has to be between 5 and 150 characters!',
      },
    },
    allowNull: false,
  },
  ReferenceData: {
    type: Sequelize.DATEONLY,
    validate: {
      isDate: {
        msg: 'Date must have the YYYY-MM-DD format.',
      },
      isBefore: '2023-01-01',
    },
    allowNull: false,
  },
  ReferenceListaAutori: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ArticleID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Reference;

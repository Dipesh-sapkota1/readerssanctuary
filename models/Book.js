import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique:true
  },
  author: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  bookCover:{
    type: DataTypes.TEXT,
  },
  publishedDate: {
    type: DataTypes.STRING(255),
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 10,
    },
  },
  dateAdded: {
    type: DataTypes.DATEONLY,
    defaultValue: sequelize.literal('CURRENT_DATE'),
  },
  review: {
    type: DataTypes.TEXT,
  },
  notes: {
    type: DataTypes.TEXT,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull:false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  tableName: 'books',
  timestamps: false,
});






export default Book;

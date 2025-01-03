import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Book from './Book.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username:{
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  user_img:{
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  preferredGenre: {
    type: DataTypes.STRING(50),
  },
  favouriteBook: {
    type: DataTypes.STRING(100),
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'books',
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

User.hasMany(Book, { foreignKey: 'userId' });
Book.belongsTo(User, { foreignKey: 'userId' });


export default User;


 
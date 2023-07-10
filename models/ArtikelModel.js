import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Category from './CategoryModel.js';

const Artikel = db.define('Artikel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false
  },
  konten: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tanggalPublikasi: {
    type: DataTypes.DATE,
    allowNull: false
  },
  gambar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Artikel.belongsTo(Category, { foreignKey: 'categoryId' });

export default Artikel;

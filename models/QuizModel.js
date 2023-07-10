import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Post from './PostModel.js';

const Quiz = db.define('Quiz', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
  options: {
    type: DataTypes.TEXT, // Menggunakan tipe data TEXT
    allowNull: false,
    get() {
      // Deserialisasi data array dari teks menjadi array JavaScript
      const optionsText = this.getDataValue('options');
      return optionsText ? JSON.parse(optionsText) : [];
    },
    set(value) {
      // Serialisasi array JavaScript menjadi teks
      const optionsText = value ? JSON.stringify(value) : '';
      this.setDataValue('options', optionsText);
    }
  },
  correctOption: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Definisikan relasi antara Quiz dan Post
Quiz.belongsTo(Post, { foreignKey: 'postId' });
Post.hasMany(Quiz, { foreignKey: 'postId' });

export default Quiz;

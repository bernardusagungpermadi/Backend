import express from 'express';
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz
} from '../controllers/Quiz.js';

const router = express.Router();

// Mendapatkan semua quiz
router.get('/quizzes', getAllQuizzes);

// Mendapatkan quiz berdasarkan ID
router.get('/quizzes/:id', getQuizById);

// Membuat quiz baru untuk sebuah post
router.post('/posts/:postId/quizzes', createQuiz);

// Mengupdate quiz berdasarkan ID
router.put('/quizzes/:id', updateQuiz);

// Menghapus quiz berdasarkan ID
router.delete('/quizzes/:id', deleteQuiz);

export default router;

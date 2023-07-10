import Quiz from '../models/QuizModel.js';
import Post from '../models/PostModel.js';

// Mendapatkan semua quiz
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

// Mendapatkan quiz berdasarkan ID
const getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findByPk(id);
    if (quiz) {
      res.status(200).json(quiz);
    } else {
      res.status(404).json({ error: 'Quiz not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

// Membuat quiz baru untuk sebuah post
const createQuiz = async (req, res) => {
  const { postId } = req.params;
  const { title, question, options, correctOption } = req.body;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const quiz = await Quiz.create({
      title,
      question,
      options,
      correctOption,
      postId
    });

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

// Mengupdate quiz berdasarkan ID
const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title, question, options, correctOption } = req.body;

  try {
    const quiz = await Quiz.findByPk(id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    await quiz.update({
      title,
      question,
      options,
      correctOption
    });

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quiz' });
  }
};

// Menghapus quiz berdasarkan ID
const deleteQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findByPk(id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    await quiz.destroy();

    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};

export { getAllQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz };

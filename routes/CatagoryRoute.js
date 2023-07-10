import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/Category.js";

const router = express.Router();

// Mendapatkan semua kategori
router.get('/categories', getCategories);

// Mendapatkan kategori berdasarkan ID
router.get('/categories/:id', getCategoryById);

// Membuat kategori baru
router.post('/categories', createCategory);

// Memperbarui kategori berdasarkan ID
router.put('/categories/:id', updateCategory);

// Menghapus kategori berdasarkan ID
router.delete('/categories/:id', deleteCategory);

export default router;

import express from 'express';
import {
  getAllArtikel,
  getArtikelById,
  createArtikel,
  updateArtikel,
  deleteArtikel
} from '../controllers/Artikel.js';

const router = express.Router();

// GET /artikel - Mendapatkan semua artikel
router.get('/artikel', getAllArtikel);

// GET /artikel/:id - Mendapatkan satu artikel berdasarkan ID
router.get('/artikel/:id', getArtikelById);

// POST /artikel - Membuat artikel baru
router.post('/artikel', createArtikel);

// PUT /artikel/:id - Mengupdate artikel berdasarkan ID
router.put('/artikel/:id', updateArtikel);

// DELETE /artikel/:id - Menghapus artikel berdasarkan ID
router.delete('/artikel/:id', deleteArtikel);

export default router;

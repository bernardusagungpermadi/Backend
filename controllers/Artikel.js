import Artikel from '../models/ArtikelModel.js';

// Mendapatkan semua artikel
const getAllArtikel = async (req, res) => {
  try {
    const artikel = await Artikel.findAll();
    res.json(artikel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam memuat data artikel' });
  }
};

// Mendapatkan satu artikel berdasarkan ID
const getArtikelById = async (req, res) => {
  const { id } = req.params;
  try {
    const artikel = await Artikel.findByPk(id);
    if (artikel) {
      res.json(artikel);
    } else {
      res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam memuat data artikel' });
  }
};

// Membuat artikel baru
const createArtikel = async (req, res) => {
  const { judul, konten, tanggalPublikasi, gambar, categoryId } = req.body;

  try {
    // Simpan artikel ke dalam database
    const artikel = await Artikel.create({
      judul,
      konten,
      tanggalPublikasi,
      gambar,
      categoryId
    });

    res.status(201).json(artikel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam membuat artikel' });
  }
};

// Mengupdate artikel berdasarkan ID
const updateArtikel = async (req, res) => {
  const { id } = req.params;
  const { judul, konten, tanggalPublikasi, gambar, categoryId } = req.body;
  try {
    const artikel = await Artikel.findByPk(id);
    if (artikel) {
      artikel.judul = judul;
      artikel.konten = konten;
      artikel.tanggalPublikasi = tanggalPublikasi;
      artikel.gambar = gambar;
      artikel.categoryId = categoryId;
      await artikel.save();
      res.json(artikel);
    } else {
      res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengupdate artikel' });
  }
};

// Menghapus artikel berdasarkan ID
const deleteArtikel = async (req, res) => {
  const { id } = req.params;
  try {
    const artikel = await Artikel.findByPk(id);
    if (artikel) {
      await artikel.destroy();
      res.json({ message: 'Artikel berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam menghapus artikel' });
  }
};

export {
  getAllArtikel,
  getArtikelById,
  createArtikel,
  updateArtikel,
  deleteArtikel
};

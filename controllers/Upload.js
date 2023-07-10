import express from "express";
import multer from "multer";
import path from "path";



const router = express.Router();

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Tentukan folder tujuan penyimpanan file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const fileName = file.fieldname + '-' + uniqueSuffix + fileExtension; // Menentukan nama file yang disimpan
    cb(null, fileName);
    req.thumbnailUrl = fileName; // Menyimpan URL gambar thumbnail di dalam request object
  }
});

// Middleware untuk mengunggah file
const upload = multer({ storage: storage });

router.post('/upload', upload.single('thumbnail'), (req, res) => {
  try {
    // Buat URL gambar
    const imageUrl = req.protocol + '://' + req.get('host') + '/uploads/' + req.thumbnailUrl;

    res.status(200).json({ thumbnailUrl: imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload thumbnail' });
  }
});


router.get('/uploads/:thumbnailUrl', (req, res) => {
  const thumbnailUrl = req.params.thumbnailUrl;
  const filePath = path.join(process.cwd(), 'uploads', thumbnailUrl);
  res.sendFile(filePath);
});


export default router;

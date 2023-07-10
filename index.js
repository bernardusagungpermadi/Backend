import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from 'dotenv';
import db from "./config/Database.js";
import SequilizeStrore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import PostRoute from "./routes/PostRoute.js";
import CategoryRoute from "./routes/CatagoryRoute.js";
import ArtikelRoute from "./routes/ArtikelRoute.js";
import UploadRoute from "./controllers/Upload.js";
import QuizeRoute from "./routes/QuizRoute.js";

dotenv.config();

const app = express();
const sessionStore = SequilizeStrore(session.Store);
const store = new sessionStore({
  db: db
});

(async () => {
  await db.sync();
})();

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: 'auto'
  }
}))

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))
app.use(express.json());

app.use(UserRoute);
app.use(AuthRoute);
app.use(PostRoute);
app.use(CategoryRoute);
app.use(ArtikelRoute);
app.use(UploadRoute);
app.use(QuizeRoute);

app.put('/posts/:id/like', (req, res) => {
  const postId = req.params.id;

  // Lakukan penambahan jumlah likes pada postingan dengan id postId di database
  // Contoh: Melakukan penambahan likes pada postingan dengan id postId

  // Mengirimkan respons sukses
  res.sendStatus(200);
});

app.put('/posts/:id/views', (req, res) => {
  const postId = req.params.id;

  // Lakukan penambahan jumlah views pada postingan dengan id postId di database
  // Contoh: Melakukan penambahan views pada postingan dengan id postId

  // Mengirimkan respons sukses
  res.sendStatus(200);
});


// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log('server up and running...');
})
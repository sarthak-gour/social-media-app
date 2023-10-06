import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import {register} from "./controllers/authController.js";
import {createPost} from "./controllers/postController.js";
import { verifyToken } from "./middleware/authorization.js";

// importing sample data to add in database
import User from "./models/User.js";
import Post from "./models/Post.js";
import {users, posts} from "./data/sampleData.js";

dotenv.config();

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(cors());

app.use('/assets', express.static(path.join(__dirName, 'public/assets')));

// FILE UPLOAD STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/assets')
    },
    filename: (req, file, cb) => {
      const d = new Date()
      console.log(Math.floor(d.getTime() / 10000))
      console.log(req)
      cb(null, `${Math.floor(d.getTime() / 10000)}-${file.originalname}`)
    }
});
const upload = multer({storage});

// ROUTES

// with files
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

// other routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);


// MONGOOSE SETUP
mongoose.connect(process.env.MONGO_URL)
  .then( () => {
    console.log('Database connected')

    // **ADD SAMPLE DATA (only once)**
    // User.insertMany(users);
    // Post.insertMany(posts);

  })
  .catch( (err) => console.log(`Connection failed: ${err}`));

  app.listen(8000, ()=> console.log('Server running'));
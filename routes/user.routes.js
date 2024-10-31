import express from 'express';
import { createUser, login } from '../controllers/user.controllers.js';
import { singleAvatar } from '../middleware/multer.js';

const app = express.Router();

app.post('/createuser',singleAvatar,createUser);

app.post('/login', login);

export default app;
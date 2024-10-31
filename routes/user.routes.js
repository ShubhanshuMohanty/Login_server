import express from 'express';
import { createUser, getProfile, login, logout } from '../controllers/user.controllers.js';
import { singleAvatar } from '../middleware/multer.js';
import { isAuth } from '../middleware/auth.js';

const app = express.Router();

app.post('/createuser',singleAvatar,createUser);

app.post('/login', login);

app.use(isAuth)
app.get('/logout',logout);
app.get('/profile',getProfile)

export default app;
import express from 'express';
import { createUser, login } from '../controllers/user.controllers.js';

const app = express.Router();

app.post('/login',createUser);

export default app;
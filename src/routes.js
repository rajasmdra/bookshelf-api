import express from 'express';
import { addBook, getBooks } from './controller.js';

const routes = express.Router();
routes.post('/books', addBook);
routes.get('/books', getBooks);

export default routes;
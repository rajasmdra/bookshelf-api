import express from 'express';
import { addBook, getBooks, getBookDetail, editBookById } from './controller.js';

const routes = express.Router();
routes.post('/books', addBook);
routes.get('/books', getBooks);
routes.get('/books/:id', getBookDetail);
routes.put('/books/:id', editBookById);

export default routes;
import express from 'express';
import { addBook, getBooks, getBookDetail } from './controller.js';

const routes = express.Router();
routes.post('/books', addBook);
routes.get('/books', getBooks);
routes.get('/books/:id', getBookDetail);

export default routes;
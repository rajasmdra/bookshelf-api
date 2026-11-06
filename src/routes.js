import express from 'express';
import { addBook } from './controller';

const routes = express.Router();
routes.post('/books', addBook);

export default routes;
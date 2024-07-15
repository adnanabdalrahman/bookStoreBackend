import { Router } from 'express';

import {
    createBook,
    deleteBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    getAllUserbooks
} from '../controllers/books.js';

const BooksRouter = Router();

BooksRouter.route('/').get(getAllBooks);
BooksRouter.route('/:bookId').get(getSingleBook);

BooksRouter.route('/:userId/:bookId').get(getSingleBook).put(updateBook).delete(deleteBook);
BooksRouter.route('/:userId/:bookId').get(getAllUserbooks).post(createBook);;

export default BooksRouter;

import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    createBook,
    deleteBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    getAllUserbooks
} from '../controllers/books.js';

const BooksRouter = Router();
BooksRouter.route('/').get(auth, getAllUserbooks).post(auth, createBook);;

// BooksRouter.route('/').get(getAllBooks);


BooksRouter.route('/:bookId').get(auth, getSingleBook);
BooksRouter.route('/:bookId').get(auth, getSingleBook).put(auth, updateBook).delete(auth, deleteBook);

export default BooksRouter;

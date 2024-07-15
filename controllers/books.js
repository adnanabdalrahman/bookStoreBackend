import Book from '../models/Book.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllBooks = asyncHandler(async (req, res, next) => {
    const books = await Book.find().sort({ date: -1 });
    res.json(books);
});

export const getAllUserbooks = asyncHandler(async (req, res, next) => {

    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.userId;
        res.send(userId);
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }

    const books = await Book.find().sort({ date: -1 });
    res.json(books);
});

export const createBook = asyncHandler(async (req, res, next) => {
    try {
        const { body } = req;
        const newBook = await Book.create({ ...body });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).send(err.message);
    }

});

export const getSingleBook = asyncHandler(async (req, res, next) => {
    res.send(req.params)
    const {
        params: { bookId }
    } = req;
    const Book = await Book.findById(id);
    if (!Book) throw new ErrorResponse(`Book with id of ${id} doesn't exist`, 404);
    res.send(Book);
});

export const updateBook = asyncHandler(async (req, res, next) => {
    const {
        body,
        params: { id }
    } = req;
    const found = await Book.findById(id);
    if (!found) throw new ErrorResponse(`Book with id of ${id} doesn't exist`, 404);
    const updatedBook = await Book.findOneAndUpdate({ _id: id }, body, { new: true });
    res.json(updatedBook);
});

export const deleteBook = asyncHandler(async (req, res, next) => {
    const {
        params: { id }
    } = req;
    const found = await Book.findById(id);
    if (!found) throw new ErrorResponse(`Book with id of ${id} doesn't exist`, 404);
    await Book.deleteOne({ _id: id });
    res.json({ success: `Book with id of ${id} was deleted` });
});




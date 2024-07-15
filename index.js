import './db/index.js';
import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import usersRouter from './routes/usersRouter.js';
import authRouter from './routes/authRouter.js';
import BooksRouter from './routes/booksRouter.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: '*' }));
app.use(express.json());





app.use('/users', usersRouter);

app.use('/', BooksRouter);
app.use('/books', BooksRouter);

//auth 
app.use('/register', authRouter);
app.use('/login', authRouter);



app.use('*', (req, res) => res.sendStatus(404));
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));

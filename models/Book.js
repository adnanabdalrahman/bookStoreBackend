import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Number,
    },
    publishDate: {
        type: String
    },
    genre: {
        type: String
    },
    description: { type: String },
    image: { type: String },
    date: { type: Date, default: Date.now },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default model('Book', BookSchema);

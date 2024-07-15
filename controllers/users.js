import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find().sort({ date: -1 });
    res.json(users);
});

export const createUser = asyncHandler(async (req, res, next) => {
    const { body } = req;
    const newUser = await User.create({ ...body });
    res.status(201).json(newUser);
});

export const getSingleUser = asyncHandler(async (req, res, next) => {
    const {
        params: { userId }
    } = req;
    const user = await User.findById(userId);
    if (!user) throw new ErrorResponse(`User with userId of ${userId} doesn't exist`, 404);
    res.send(user);
});

export const updateUser = asyncHandler(async (req, res, next) => {
    const {
        body,
        params: { userId }
    } = req;
    const found = await User.findById(userId);
    if (!found) throw new ErrorResponse(`User with userId of ${userId} doesn't exist`, 404);
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, body, { new: true });
    res.json(updatedUser);
});

export const deleteUser = asyncHandler(async (req, res, next) => {
    const {
        params: { userId }
    } = req;
    const found = await User.findById(userId);
    if (!found) throw new ErrorResponse(`User with userId of ${userId} doesn't exist`, 404);
    await User.deleteOne({ _id: userId });
    res.json({ success: `User with userId of ${userId} was deleted` });
});

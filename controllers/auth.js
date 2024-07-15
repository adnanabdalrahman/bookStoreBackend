import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import jwt from 'jsonwebtoken';



export const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ firstname, lastname, email, password });
        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});


export const loginUser = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorResponse('Please provide an email and password', 400));
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const jwtSecret = 'open sesame';
        const payload = { userId: user._id };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).send(err.message);
    }


    // // Check if email and password are provided
    // if (!email || !password) {
    //     return next(new ErrorResponse('Please provide an email and password', 400));
    // }

    // // Check if user exists
    // const user = await User.findOne({ email });

    // if (!user) {
    //     return next(new ErrorResponse('Invalid credentials', 401));
    // }
    // // Check if password matches
    // const isMatch = await user.matchPassword(password);
    // if (!isMatch) {
    //     return next(new ErrorResponse('Invalid credentials', 401));
    // }
    // res.send(user)



    // const payload = { userId: user._id };
    // const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    // res.status(200).json({ success: true, token });
    // } catch (error) {
    //     res.status(500).send(err.message);

    // }

});

import jwt from 'jsonwebtoken';
const jwtSecret = process.env.jwtSecret;

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default auth;
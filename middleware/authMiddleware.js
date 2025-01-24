import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the JWT using the secret key stored in your environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("alabama tok JWT:", decoded);
        req.user = decoded; // Attach the decoded user data (userId, role, etc.) to req.user
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};

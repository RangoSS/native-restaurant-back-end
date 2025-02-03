import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../model/employee.js';  // Import the User model

// POST: Login user
export const Login = async (req, res) => {
    try {
        // Destructure email and password from the request body
        const { email, password } = req.body;

        // Validate that both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        //this will send token to middleware
        const token = jwt.sign(
            { id: user._id, role: user.role ,name: user.name },
            process.env.JWT_SECRET, // Secret key from environment variables
            { expiresIn: '1h' } // Token expiration (1 hour)
        );

        // Log the token to the console for debugging
        console.log('Generated JWT Token:', token);
        console.log('User Data:', {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            active: user.active
        });
        // Respond with the token and user info (excluding the password)
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                active: user.active,
            },
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

import bcrypt from 'bcrypt';

import { User } from '../model/employee.js';

export const postUser = async (req, res) => {
    try {
        // Destructure user details from the request body
        const { name, surname, idNumber, email, password, role, designation, joining_date, salary, phone, address } = req.body;

        // Validate required fields
        if (!name || !surname || !idNumber || !email || !password || !role || !designation || !joining_date || !salary || !phone || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = new User({
            name,
            surname,
            idNumber,
            email,
            password: hashedPassword,
            role,
            designation,
            joining_date,
            salary,
            phone,
            address,
            active: true, // Default active status
        });

        // Save the user to the database
        await newUser.save();

        // Respond with success
        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                active: newUser.active,
            },
        });
    } catch (error) {
        console.error('Error creating user:', error.message);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password

        return res.status(200).json({
            message: 'Users retrieved successfully',
            users,
        });
    } catch (error) {
        console.error('Error retrieving users:', 'server error', error.message);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const userId = req.user.id; // Get the userId from authentication middleware
        const { name, surname, email, role, designation, salary, phone, address, active } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.name = name || user.name;
        user.surname = surname || user.surname;
        user.email = email || user.email;
        user.role = role || user.role;
        user.designation = designation || user.designation;
        user.salary = salary || user.salary;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.active = active !== undefined ? active : user.active;

        const updatedUser = await user.save();

        return res.status(200).json({
            message: 'User updated successfully',
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                active: updatedUser.active,
            },
        });
    } catch (error) {
        console.error('Error updating user:', error.message);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const userId = req.user.id; // Get the userId from authentication middleware

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove();

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

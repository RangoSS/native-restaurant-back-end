import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    idNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    joining_date: {
        type: Date,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Define collection name
const User = mongoose.model('User', userSchema, 'restaurant-user'); // Collection name is 'restaurant-user'

export { User };

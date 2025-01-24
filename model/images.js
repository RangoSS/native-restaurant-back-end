import mongoose from "mongoose";

// Define Image Schema
const ImageSchema = new mongoose.Schema({
  fileId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'fs.files' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Assumes there's a User model
  createdAt: { type: Date, default: Date.now }
});

// Create and export Image model
const Image = mongoose.model("Image", ImageSchema);

export default Image;

import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    address: { type: String },
    contact: { type: String },
    email: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/ }, // Email validation regex
    service: { type: String },
    type: { type: String },
    priceOfBooking: { type: Number, required: true, min: 0 }, // Ensures non-negative price
    numberOfDaysBooked: { type: Number, min: 0 }, // Non-negative number
    numberOfPeopleBooked: { type: Number, min: 0 }, // Non-negative number
    image: { type: String }, // Firebase image URL
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User model
  },
  { timestamps: true }
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;

import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String },
  contact: { type: String },
  email: { type: String },
  service: { type: String },
  type: { type: String },
  priceOfBooking: { type: Number },
  numberOfDaysBooked: { type: Number },
  numberOfPeopleBooked: { type: Number },
  image: { type: String }, // Firebase image URL
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;

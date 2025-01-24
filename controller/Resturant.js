import Restaurant from '../model/resModel.js'; // Your Mongoose model
import { uploadImageToFirebase } from '../utility/firebase.js';

export const addRestaurant = async (req, res) => {
  try {
    // Upload image to Firebase
    const imageUrl = await uploadImageToFirebase(req.file);

    // Save restaurant data in MongoD
    const restaurant = new Restaurant({
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      contact: req.body.contact,
      email: req.body.email,
      service: req.body.service,
      type: req.body.type,
      priceOfBooking: req.body.priceOfBooking,
      numberOfDaysBooked: req.body.numberOfDaysBooked,
      numberOfPeopleBooked: req.body.numberOfPeopleBooked,
      image: imageUrl, // Save Firebase URL in MongoDB
    });

    const savedRestaurant = await restaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

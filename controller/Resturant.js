import Restaurant from '../model/resModel.js'; // Your Mongoose model
import { uploadImageToFirebase } from '../utility/firebase.js';

export const addRestaurant = async (req, res) => {
  try {
    // Validate incoming data
    const { name, description, address, contact, email, service, type, priceOfBooking, numberOfDaysBooked, numberOfPeopleBooked } = req.body;

    // Ensure all required fields are provided
    if (!name || !email || !contact || !priceOfBooking) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Optional: Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (email && !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Ensure priceOfBooking is a positive number
    if (priceOfBooking <= 0) {
      return res.status(400).json({ error: 'Price of booking must be a positive number' });
    }

    // Ensure numberOfDaysBooked and numberOfPeopleBooked are positive integers
    if (numberOfDaysBooked < 0 || numberOfPeopleBooked < 0) {
      return res.status(400).json({ error: 'Number of days and people booked must be non-negative' });
    }

    // Upload image to Firebase
    const imageUrl = await uploadImageToFirebase(req.file);

    // Create a new restaurant with userID
    const restaurant = new Restaurant({
      name,
      description,
      address,
      contact,
      email,
      service,
      type,
      priceOfBooking,
      numberOfDaysBooked,
      numberOfPeopleBooked,
      image: imageUrl, // Save Firebase URL in MongoDB
      userID: req.user.id, // Assuming req.userId is set by authentication middleware
    });

    // Save the restaurant
    const savedRestaurant = await restaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

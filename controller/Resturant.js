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

// Update Restaurant function
export const updateRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, description, address, contact, email, service, type, priceOfBooking, numberOfDaysBooked, numberOfPeopleBooked } = req.body;

    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(restaurantId);

    // Check if the restaurant exists
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Check if the logged-in user is the owner of the restaurant
    if (restaurant.userID.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized to update this restaurant' });
    }

    // Update restaurant data
    restaurant.name = name || restaurant.name;
    restaurant.description = description || restaurant.description;
    restaurant.address = address || restaurant.address;
    restaurant.contact = contact || restaurant.contact;
    restaurant.email = email || restaurant.email;
    restaurant.service = service || restaurant.service;
    restaurant.type = type || restaurant.type;
    restaurant.priceOfBooking = priceOfBooking || restaurant.priceOfBooking;
    restaurant.numberOfDaysBooked = numberOfDaysBooked || restaurant.numberOfDaysBooked;
    restaurant.numberOfPeopleBooked = numberOfPeopleBooked || restaurant.numberOfPeopleBooked;

    // If there's an updated image, upload it to Firebase
    if (req.file) {
      const imageUrl = await uploadImageToFirebase(req.file);
      restaurant.image = imageUrl;
    }

    // Save the updated restaurant
    const updatedRestaurant = await restaurant.save();
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Restaurant function
export const deleteRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
     
    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(restaurantId);
    
    // Check if the restaurant exists
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Check if the logged-in user is the owner of the restaurant
    if (restaurant.userID.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized to update this restaurant' });
    }
    
    // Delete the restaurant
     await restaurant.deleteOne()
  
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
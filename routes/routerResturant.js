import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js'; 
//import { checkRole } from '../middleware/roleMiddleware.js'; 
// routers/userRoutes.js
import { postUser,getAllUsers,updateUser , deleteUser } from '../controller/User.js'; // Importing from your controller
import { addRestaurant } from '../controller/Resturant.js';
import { Login } from '../controller/login.js'; // Importing from your controller
import upload from '../middleware/upload.js';
import {updateRestaurant,deleteRestaurant ,getAllRestaurants,getAllRes} from '../controller/Resturant.js';

const router = express.Router();

router.post('/login', Login);
// POST endpoint to add an employee
router.post('/user', postUser);
router.post('/restaurants',verifyToken,upload.single('image'), addRestaurant);
router.put('/restaurants/:restaurantId',verifyToken,upload.single('image'), updateRestaurant);
router.delete('/restaurants/:restaurantId',verifyToken, deleteRestaurant);
router.put('/user/:userId',verifyToken, updateUser);
router.delete('/user/:userId',verifyToken, deleteUser);
router.get('/restaurants',verifyToken, getAllRestaurants);
router.get('/restall', getAllRes);
//router.post('/restaurant', verifyToken, checkRole(['post_user','post_recipe', 'delete_recipe', 'delete_user','update_recipe']), postRecipe);

router.get('/user', getAllUsers);



export default router; 
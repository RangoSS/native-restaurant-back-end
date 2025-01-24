import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js'; 
//import { checkRole } from '../middleware/roleMiddleware.js'; 
// routers/userRoutes.js
import { postUser,getAllUsers } from '../controller/User.js'; // Importing from your controller
import { addRestaurant } from '../controller/Resturant.js';
import { Login } from '../controller/login.js'; // Importing from your controller
import upload from '../middleware/upload.js';
import {updateRestaurant} from '../controller/Resturant.js';
//import { Login } from '../controller/contLogin.js'; // Importing from your controller
//import { postRecipe ,getRecipe,updateRecipe,deleteRecipe,getRecipeTest} from '../controller/contRecipe.js';

const router = express.Router();

router.post('/login', Login);
// POST endpoint to add an employee
router.post('/user', postUser);
router.post('/restaurants',verifyToken,upload.single('image'), addRestaurant);
router.put('/restaurants/:restaurantId',verifyToken,upload.single('image'), addRestaurant);
//router.post('/restaurant', verifyToken, checkRole(['post_user','post_recipe', 'delete_recipe', 'delete_user','update_recipe']), postRecipe);
//router.get('/restaurant', verifyToken, checkRole(['post_user','post_recipe', 'delete_recipe', 'delete_user','update_recipe']), getRecipe);
//router.put('/restaurant/:restId', verifyToken, checkRole(['post_user','post_recipe', 'delete_recipe', 'delete_user','update_recipe']), updateRecipe);
//router.delete('/recipes/:restId', verifyToken, checkRole(['post_user','post_recipe', 'delete_recipe', 'delete_user','update_recipe']), deleteRecipe);
//router.post('/recipe', postRecipe);
//router.post('/user',postUser);
router.get('/user', getAllUsers);
//router.post('/login', Login);
//router.get('/test', getRecipeTest);
//router.post('/l', Login);
//router.get('/recipes', getRecipe);


// GET endpoint to retrieve all employees
//router.get('/user-info', getUser);



export default router; 
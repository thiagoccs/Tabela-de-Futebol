import { Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';

const userService = new UserService();
const userController = new UserController(userService);
const userRoutes = Router();

userRoutes.post('/', (req, res) => userController.findOneUser(req, res));

export default userRoutes;

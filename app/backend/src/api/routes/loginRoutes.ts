import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateCredentials from '../middlewares/checkCredentials.middle';
import LoginService from '../services/LoginService';

const loginService = new LoginService();
const loginController = new LoginController(loginService);
const loginRoutes = Router();

loginRoutes.post('/', validateCredentials, (req, res) => loginController.findOneUser(req, res));

export default loginRoutes;

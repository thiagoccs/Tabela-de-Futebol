import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateCredentials from '../middlewares/checkCredentials.middle';
import validateToken from '../middlewares/checkToken.middle';
import LoginService from '../services/LoginService';

const loginService = new LoginService();
const loginController = new LoginController(loginService);
const loginRoutes = Router();

loginRoutes.post('/', validateCredentials, (req, res) => loginController.findOneUser(req, res));

loginRoutes.get('/role', validateToken, (req, res) => loginController.getRole(req, res));

export default loginRoutes;

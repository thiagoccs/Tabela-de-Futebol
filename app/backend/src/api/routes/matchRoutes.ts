import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import validateToken from '../middlewares/checkToken.middle';
import MatchService from '../services/MatchService';

const matchService = new MatchService();
const matchController = new MatchController(matchService);
const matchRoutes = Router();

matchRoutes
  .get('/', (req, res) => matchController.findAll(req, res));

matchRoutes
  .patch('/:id/finish', validateToken, (req, res) => matchController.changeMatch(req, res));

export default matchRoutes;
import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchService = new MatchService();
const matchController = new MatchController(matchService);
const matchRoutes = Router();

matchRoutes.get('/', (req, res) => matchController.findAll(req, res));

export default matchRoutes;
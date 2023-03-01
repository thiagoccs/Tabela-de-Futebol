import { Router } from 'express';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

const teamService = new TeamService();
const teamController = new TeamController(teamService);
const teamsRoutes = Router();

teamsRoutes.get('/', (req, res) => teamController.findAll(req, res));

teamsRoutes.get('/:id', (req, res) => teamController.findById(req, res));

export default teamsRoutes;

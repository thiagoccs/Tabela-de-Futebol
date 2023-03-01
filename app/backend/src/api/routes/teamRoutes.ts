import { Router } from 'express';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

const teamService = new TeamService();
const teamControlle = new TeamController(teamService);
const teamsRoutes = Router();

teamsRoutes.get('/', teamControlle.findAll);

export default teamsRoutes;

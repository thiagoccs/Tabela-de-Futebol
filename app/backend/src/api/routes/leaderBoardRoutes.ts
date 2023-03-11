import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamService = new TeamService();
const teamController = new TeamController(teamService);
const leaderBoardRoutes = Router();

leaderBoardRoutes.get('/home', (req, res) => teamController.leaderBoardHome(req, res));

export default leaderBoardRoutes;

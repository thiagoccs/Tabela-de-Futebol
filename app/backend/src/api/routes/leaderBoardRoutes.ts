import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';
import LeaderBoardService from '../services/LeaderBoardHomeService';

const leaderBoardService = new LeaderBoardService();
const leaderBoardHomeController = new LeaderBoardController(leaderBoardService);

const leaderBoardRoutes = Router();

leaderBoardRoutes.get('/home', (req, res) => leaderBoardHomeController.leaderBoardHome(req, res));

export default leaderBoardRoutes;

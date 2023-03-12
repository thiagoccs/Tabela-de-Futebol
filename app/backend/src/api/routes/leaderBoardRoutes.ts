import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';
import LeaderBoardHomeService from '../services/LeaderBoardHomeService';
import LeaderBoardAwayService from '../services/LeaderBoardAwayService';
import LeaderBoardService from '../services/LeaderBoard';

const leaderBoardHomeService = new LeaderBoardHomeService();
const leaderBoardAwayService = new LeaderBoardAwayService();
const leaderBoardService = new LeaderBoardService();

const leaderBoardController = new LeaderBoardController(
  leaderBoardHomeService,
  leaderBoardAwayService,
  leaderBoardService,
);

const leaderBoardRoutes = Router();

leaderBoardRoutes.get('/home', (req, res) => leaderBoardController.leaderBoardHome(req, res));
leaderBoardRoutes.get('/away', (req, res) => leaderBoardController.leaderBoardAway(req, res));
leaderBoardRoutes.get('/', (req, res) => leaderBoardController.leaderBoard(req, res));

export default leaderBoardRoutes;

import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  private _service: LeaderBoardService;

  constructor(service: LeaderBoardService) {
    this._service = service;
  }

  async leaderBoardHome(req: Request, res: Response) {
    const allTeams = await this._service.leaderboard();
    return res.status(200).json(allTeams);
  }
}

import { Request, Response } from 'express';
// import IMatch from '../interfaces/IMatch';
import IServiceTeam from '../interfaces/IServiceTeam';
// import ITeam from '../interfaces/ITeam';
// import MatchService from '../services/MatchService';

// const matchesService = new MatchService();

export default class TeamController {
  private _service: IServiceTeam;

  constructor(service: IServiceTeam) {
    this._service = service;
  }

  async findAll(_req: Request, res: Response) {
    const allTeams = await this._service.findAll();
    // console.log(allTeams);

    return res.status(200).json(allTeams);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);

    const selectedTeamById = await this._service.findById(Number(id));
    if (selectedTeamById) return res.status(200).json(selectedTeamById);
    return res.status(401).json({ message: 'time não encontrado' });
  }
}

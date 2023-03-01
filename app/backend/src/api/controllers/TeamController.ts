import { Request, Response } from 'express';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamController {
  private _service: IServiceTeam;

  constructor(service: IServiceTeam) {
    this._service = service;
  }

  async findAll(_req: Request, res: Response) {
    const allTeams = await this._service.findAll();
    console.log(allTeams);

    return res.status(200).json(allTeams);
  }
}

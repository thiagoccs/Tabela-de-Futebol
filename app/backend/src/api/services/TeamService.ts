import Team from '../../database/models/TeamModel';
import IServiceTeam from '../interfaces/IServiceTeam';
import ITeam from '../interfaces/ITeam';

export default class TeamService implements IServiceTeam {
  create(dto: ITeam): Promise<Team> {
    throw new Error('Method not implemented.');
  }
}

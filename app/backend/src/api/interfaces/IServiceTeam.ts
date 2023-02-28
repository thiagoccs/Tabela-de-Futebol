import Team from '../../database/models/TeamModel';
import ITeam from './ITeam';

export default interface IServiceTeam {
  create(dto: ITeam): Promise<Team>
}

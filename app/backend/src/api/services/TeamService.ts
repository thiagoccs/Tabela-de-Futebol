import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamModel';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  async findAll(): Promise<Team[]> {
    const allTeams = await this.model.findAll();
    return allTeams;
  }
}

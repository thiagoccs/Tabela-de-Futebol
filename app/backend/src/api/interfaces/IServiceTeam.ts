import Team from '../../database/models/TeamModel';

export default interface IServiceTeam {
  findAll(): Promise<Team[]>
}

import Team from '../../database/models/TeamModel';

export default interface IServiceTeam {
  findAll(): Promise<Team[]>
  findById(id: number): Promise<Team | null>,
}

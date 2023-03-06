import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamModel';
import Match from '../../database/models/MatchModel';
import IMatch from '../interfaces/IMatch';
import IServiceMatch from '../interfaces/IServiceMatch';

export default class MatchService implements IServiceMatch {
  protected model: ModelStatic<Match> = Match;

  async findAll(): Promise<IMatch[]> {
    const allMatches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return allMatches;
  }

  async finishedMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }
}

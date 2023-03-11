import { ModelStatic } from 'sequelize';
import Match from '../../database/models/MatchModel';
import Team from '../../database/models/TeamModel';
import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';

export default class LeaderBoardService {
  protected teamModel: ModelStatic<Team> = Team;
  protected matchModel: ModelStatic<Match> = Match;

  async findAll(): Promise<Team[]> {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }

  public static totalDeVitorias(id: number, matches: IMatch[]): number {
    const vitorias = matches.filter((match) => {
      const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = match;
      return (homeTeamId === id && homeTeamGoals > awayTeamGoals)
        || (awayTeamId === id && awayTeamGoals > homeTeamGoals);
    }).length;
    return vitorias;
  }

  public static totalDeEmpates(id: number, matches: IMatch[]): number {
    const empates = matches.filter((match) => {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;
      return (homeTeamId === id || awayTeamId === id) && (homeTeamGoals === awayTeamGoals);
    }).length;
    return empates;
  }

  public static totalDePontos(id: number, matches: IMatch[]): number {
    const vitorias = LeaderBoardService.totalDeVitorias(id, matches);
    const empates = LeaderBoardService.totalDeEmpates(id, matches);
    const pontos = vitorias * 3 + empates;
    return pontos;
  }

  public static totalDeJogos(id: number, matches: IMatch[]): number {
    const jogos = matches.filter((match) => {
      const { homeTeamId, awayTeamId } = match;
      return homeTeamId === id || awayTeamId === id;
    }).length;
    return jogos;
  }

  public static totalDeDerrotas(id: number, matches: IMatch[]): number {
    const derrotas = matches.filter((match) => {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;
      return (homeTeamId === id && homeTeamGoals < awayTeamGoals)
        || (awayTeamId === id && awayTeamGoals < homeTeamGoals);
    }).length;
    return derrotas;
  }

  public static golsAFavor(id: number, matches: IMatch[]): number {
    let golsPro = 0;
    matches.forEach((match) => {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;
      if (homeTeamId === id) {
        golsPro += homeTeamGoals;
      } else if (awayTeamId === id) {
        golsPro += awayTeamGoals;
      }
    });
    return golsPro;
  }

  public static golsContra(id: number, matches: IMatch[]): number {
    let golsContra = 0;
    matches.forEach((match) => {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;
      if (homeTeamId === id) {
        golsContra += awayTeamGoals;
      } else if (awayTeamId === id) {
        golsContra += homeTeamGoals;
      }
    });
    return golsContra;
  }

  public static saldoDeGols(id: number, matches: IMatch[]): number {
    const golsPro = this.golsAFavor(id, matches);
    const golsContra = this.golsContra(id, matches);

    const goalsBalance = golsPro - golsContra;
    return goalsBalance;
  }

  public static aproveitamento(id: number, matches: IMatch[]): string {
    const pontos = this.totalDePontos(id, matches);
    const jogos = this.totalDeJogos(id, matches);

    const efficiency = ((pontos / (jogos * 3)) * 100).toFixed(2);
    return efficiency;
  }

  public static calculoDePontos(teams: ITeam[], matches: IMatch[]) {
    const result = teams.map(({ id, teamName }) => ({
      name: teamName,
      totalPoints: this.totalDePontos(id as number, matches),
      totalGames: this.totalDeJogos(id as number, matches),
      totalVictories: this.totalDeVitorias(id as number, matches),
      totalDraws: this.totalDeEmpates(id as number, matches),
      totalLosses: this.totalDeDerrotas(id as number, matches),
      goalsFavor: this.golsAFavor(id as number, matches),
      goalsOwn: this.golsContra(id as number, matches),
      goalsBalance: this.saldoDeGols(id as number, matches),
      efficiency: this.aproveitamento(id as number, matches),
    }));
    return result;
  }

  async leaderboard() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll({
      where: { inProgress: 0 },
      raw: true,
    });

    const result = LeaderBoardService.calculoDePontos(teams, matches);
    return result;
  }
}

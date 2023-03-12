import { ModelStatic } from 'sequelize';
import Match from '../../database/models/MatchModel';
import Team from '../../database/models/TeamModel';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';

export default class LeaderBoardHomeService {
  protected teamModel: ModelStatic<Team> = Team;
  protected matchModel: ModelStatic<Match> = Match;

  async findAll(): Promise<Team[]> {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }

  public static totalDeVitorias(id: number, matches: IMatch[]): number {
    const vitorias = matches.filter((match) => {
      const { homeTeamId, homeTeamGoals, awayTeamGoals } = match;
      return (homeTeamId === id && homeTeamGoals > awayTeamGoals);
      // || (awayTeamId === id && awayTeamGoals > homeTeamGoals);
    }).length;
    return vitorias;
  }

  public static totalDeEmpates(id: number, matches: IMatch[]): number {
    const empates = matches.filter((match) => {
      const { homeTeamId, homeTeamGoals, awayTeamGoals } = match;
      return (homeTeamId === id
      //  || awayTeamId === id
      )
        && (homeTeamGoals === awayTeamGoals);
    }).length;
    return empates;
  }

  public static totalDePontos(id: number, matches: IMatch[]): number {
    const vitorias = LeaderBoardHomeService.totalDeVitorias(id, matches);
    const empates = LeaderBoardHomeService.totalDeEmpates(id, matches);
    const pontos = vitorias * 3 + empates;
    return pontos;
  }

  public static totalDeJogos(id: number, matches: IMatch[]): number {
    const jogos = matches.filter((match) => {
      const { homeTeamId } = match;
      return homeTeamId === id;
      // || awayTeamId === id;
    }).length;
    return jogos;
  }

  public static totalDeDerrotas(id: number, matches: IMatch[]): number {
    const derrotas = matches.filter((match) => {
      const { homeTeamId, homeTeamGoals, awayTeamGoals } = match;
      return (homeTeamId === id && homeTeamGoals < awayTeamGoals);
      // || (awayTeamId === id && awayTeamGoals < homeTeamGoals);
    }).length;
    return derrotas;
  }

  public static golsAFavor(id: number, matches: IMatch[]): number {
    let golsPro = 0;
    matches.forEach((match) => {
      const { homeTeamId, homeTeamGoals } = match;
      if (homeTeamId === id) {
        golsPro += homeTeamGoals;
      }
      // else if (awayTeamId === id) {
      //   golsPro += awayTeamGoals;
      // }
    });
    return golsPro;
  }

  public static golsContra(id: number, matches: IMatch[]): number {
    let golsContra = 0;
    matches.forEach((match) => {
      const { homeTeamId, awayTeamGoals } = match;
      if (homeTeamId === id) {
        golsContra += awayTeamGoals;
      }
      // else if (awayTeamId === id) {
      //   golsContra += homeTeamGoals;
      // }
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

  public static ordenamento(teamsLeaderBoard: ILeaderBoard[]) {
    const timesOrdenados = teamsLeaderBoard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      return 0;
    });
    return timesOrdenados;
  }

  public static calculoDePontos(teams: ITeam[], matches: IMatch[]) {
    const ordenados = teams.map(({ id, teamName }) => ({
      name: teamName,
      totalPoints: this.totalDePontos(Number(id), matches),
      totalGames: this.totalDeJogos(Number(id), matches),
      totalVictories: this.totalDeVitorias(Number(id), matches),
      totalDraws: this.totalDeEmpates(Number(id), matches),
      totalLosses: this.totalDeDerrotas(Number(id), matches),
      goalsFavor: this.golsAFavor(Number(id), matches),
      goalsOwn: this.golsContra(Number(id), matches),
      goalsBalance: this.saldoDeGols(Number(id), matches),
      efficiency: this.aproveitamento(Number(id), matches),
    }));
    return ordenados;
  }

  async leaderBoard() {
    const times = await this.teamModel.findAll();
    const partidas = await this.matchModel.findAll({
      where: { inProgress: 0 },
      raw: true,
    });
    // console.log(partidas);
    const result = LeaderBoardHomeService.calculoDePontos(times, partidas);
    const ordenado = LeaderBoardHomeService.ordenamento(result);
    return ordenado;
  }
}

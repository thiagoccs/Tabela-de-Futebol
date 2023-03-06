import IMatch from './IMatch';

export default interface IServiceMatch {
  findAll(): Promise<IMatch[]>;
  finishedMatch(id: number): Promise<void>;
  updateGoalsMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>;
  // createNewMath(homeTeamId: number, awayTeamId: number,
  //   homeTeamGoals: number, awayTeamGoals: number): Promise<IMatch>;
}

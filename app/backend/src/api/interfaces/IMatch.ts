export default interface IMatch {
  id?: number;
  homeTeamGoals: number;
  homeTeamId: number;
  awayTeamGoals: number;
  awayTeamId: number;
  inProgress: boolean;
}

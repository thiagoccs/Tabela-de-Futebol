import IMatch from './IMatch';

export default interface IServiceMatch {
  findAll(): Promise<IMatch[]>
  finishedMatch(id: number): Promise<void>
}

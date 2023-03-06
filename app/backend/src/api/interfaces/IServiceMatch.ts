import IMatch from './IMatch';

export default interface IServiceMatch {
  findAll(): Promise<IMatch[]>
}

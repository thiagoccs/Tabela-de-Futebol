export default interface IServiceLogin {
  validate(email: string, password: string): Promise<string | null>
}

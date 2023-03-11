import * as express from 'express';
import teamsRoutes from './api/routes/teamRoutes';
import loginRoutes from './api/routes/loginRoutes';
import matchRoutes from './api/routes/matchRoutes';
import leaderBoardRoutes from './api/routes/leaderBoardRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.initRoutes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }

  private initRoutes(): void {
    this.app.use('/teams', teamsRoutes);
    this.app.use('/login', loginRoutes);
    this.app.use('/matches', matchRoutes);
    this.app.use('/leaderboard', leaderBoardRoutes);
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();

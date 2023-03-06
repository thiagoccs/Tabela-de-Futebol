import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class Match extends Model {
  declare readonly id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
  modelName: 'matches',
});

Team.hasMany(Match, { foreignKey: 'id', as: 'away_team_id' });
Team.hasMany(Match, { foreignKey: 'id', as: 'home_team_id' });
Match.belongsTo(Team, { foreignKey: 'away_team_id', as: 'awayTeam' });
Match.belongsTo(Team, { foreignKey: 'home_team_id', as: 'homeTeam' });

export default Match;

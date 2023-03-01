import Team from '../../database/models/TeamModel'

const teamsMock: Team[] = [
  new Team({ id: 1, teamName: 'Cruzeiro', }),
  new Team({ id: 2, teamName: 'Patético Mineiro', }),
  new Team({ id: 3, teamName: 'Frangas', }),
  new Team({ id: 4, teamName: 'Átomo mineiro', }),
  new Team({ id: 5, teamName: 'Time que o Ronaldinho jogou', }),
];

export default teamsMock;
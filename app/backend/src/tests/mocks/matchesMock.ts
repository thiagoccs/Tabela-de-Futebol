const machesMock = [
  {
    "id": 43,
    "homeTeamId": 11,
    "homeTeamGoals": 0,
    "awayTeamId": 10,
    "awayTeamGoals": 0,
    "inProgress": true,
    "away_team_id": 10,
    "home_team_id": 11,
    "homeTeam": {
      "teamName": "Napoli-SC"
    },
    "awayTeam": {
      "teamName": "Minas Brasília"
    }
  },
  {
    "id": 44,
    "homeTeamId": 7,
    "homeTeamGoals": 2,
    "awayTeamId": 15,
    "awayTeamGoals": 2,
    "inProgress": true,
    "away_team_id": 15,
    "home_team_id": 7,
    "homeTeam": {
      "teamName": "Flamengo"
    },
    "awayTeam": {
      "teamName": "São José-SP"
    }
  },
  {
    "id": 45,
    "homeTeamId": 5,
    "homeTeamGoals": 1,
    "awayTeamId": 3,
    "awayTeamGoals": 1,
    "inProgress": true,
    "away_team_id": 3,
    "home_team_id": 5,
    "homeTeam": {
      "teamName": "Cruzeiro"
    },
    "awayTeam": {
      "teamName": "Botafogo"
    }
  },
]

const bodyMatchMock = {
  "homeTeamId": 5,
  "awayTeamId": 3,
  "homeTeamGoals": 8,
  "awayTeamGoals": 0,
}

const responseMatchMock = {
  "id": 50,
  "homeTeamId": 5,
  "homeTeamGoals": 8,
  "awayTeamId": 3,
  "awayTeamGoals": 0,
  "inProgress": true,
}

export { machesMock, bodyMatchMock, responseMatchMock };
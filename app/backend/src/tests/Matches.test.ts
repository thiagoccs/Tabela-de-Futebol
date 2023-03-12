import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Team from '../database/models/ExampleModel';
import { teamsMock, oneTeamMock } from './mocks/teamsMock';

// import { Response } from 'superagent';
import TeamService from '../api/services/TeamService';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import { machesMock, bodyMatchMock, responseMatchMock } from './mocks/matchesMock';
import MatchService from '../api/services/MatchService';
import IMatch from '../api/interfaces/IMatch';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de serviço: Matches', function() {
  afterEach(function() {
    sinon.restore()
  })

  it('caso 1: Deve retornar todos as partidas "findAll"', async function() {
    sinon.stub(Match, 'findAll').resolves(machesMock as unknown as Match[]);
    
    const service = new MatchService;
    const result = await service.findAll();
    // console.log(result);

    const response = await chai.request(app).get('/matches');
    
    expect(result).to.be.equal(machesMock);
    expect(result.length).to.be.equal(3)
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(machesMock);
  });

  it('caso 2: Deve retornar a partida criada com sucesso', async function() {
    sinon.stub(jwt, 'verify').callsFake(() => {
      return Promise.resolve({success: 'Token is valid'});
    });
    sinon.stub(Match, 'create').resolves(responseMatchMock as unknown as Match);

    const response = await chai.request(app)
      .post('/matches')
      .set('authorization', 'token')
      .send(bodyMatchMock);

    expect(response.status).to.be.eq(201);
    expect(response.body).to.deep.eq(responseMatchMock);

  });
})
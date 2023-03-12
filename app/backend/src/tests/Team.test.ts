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

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de serviço: Team', function() {
  afterEach(function() {
    sinon.restore()
  })

  it('caso 1: Deve retornar todos os times "findAll"', async function() {
    sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);
    
    const service = new TeamService;
    const result = await service.findAll();
    // console.log(result);

    const response = await chai.request(app).get('/teams');
    
    expect(result).to.be.equal(teamsMock);
    expect(result.length).to.be.equal(5)
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsMock);
  });

  it('caso 2: Deve retornar 1 time pelo id "findByPk"', async function() {
    sinon.stub(Team, 'findByPk').resolves(oneTeamMock as Team)
    
    const service = new TeamService;
    const result = await service.findById(oneTeamMock.id);
    // console.log(result);

    const response = await chai.request(app).get('/teams/1');
    
    expect(result).to.be.equal(oneTeamMock);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(oneTeamMock);
  });
})
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

// import { app } from '../app';
// import Team from '../database/models/ExampleModel';
import teamsMock from './mocks/teamsMock';

// import { Response } from 'superagent';
import { Model } from 'sequelize';
import TeamService from '../api/services/TeamService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de serviço: FindAll Team', function() {
  afterEach(function() {
    sinon.restore()
  })

  it('caso 1: Deve retornar todos os times', async function() {
    sinon.stub(Model, 'findAll').resolves(teamsMock);
    const service = new TeamService;
    const result = await service.findAll();
    // console.log(result);
    
    expect(result).to.be.equal(teamsMock);
    expect(result.length).to.be.equal(5)
  })
})

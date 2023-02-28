import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/ExampleModel';
import teamsMock from './mocks/teamsMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste se executa o npm test', () => {

// VOU CONTINUAR COM REQUISITO 3 PARA DEPOIS VOLTAR PARA ESSE
  it('teste', () => {
    expect(true).to.be.eq(true);
  });
});

import { Types } from 'mongoose';
import chai from 'chai';
import chaiHttp = require('chai-http');
import server from '../../../server';
import mongoose from 'mongoose';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test CarShopController', () => {
  before(function() {
    mongoose.createConnection('mongodb://mongodb:27017/CarShop');
  });

  after(function() {
    mongoose.connection.close();
  });

  server.startServer();

  const app = server.getApp();

  describe('Testa CarController', () => {
    const validCarMock = {
      model: 'Uno da Escada',
      year: 1963,
      color: 'red',
      buyValue: 3500,
      seatsQty: 2,
      doorsQty: 2
    };
    describe('create()', () => {
      it('Tests if the request for the route POST returns 201 with a valid body', async ()=> {
        const carCreatedResponse = await chai.request(app).post('/cars').send(validCarMock)
  
        expect(carCreatedResponse.status).to.be.equal(201);
      });
  
      it('Tests whether an object is returned in the response body', async ()=> {
        const carCreatedResponse = await chai.request(app).post('/cars').send(validCarMock)
    
        expect(carCreatedResponse.body).to.be.an('object');
      });
  
      it('Tests if the returned object has the expected data', async () => {
        const carCreatedResponse = await chai.request(app).post('/cars').send(validCarMock);
  
        expect(carCreatedResponse.body).to.have.property('model');
        expect(carCreatedResponse.body).to.have.property('year');
        expect(carCreatedResponse.body).to.have.property('color');
        expect(carCreatedResponse.body).to.have.property('buyValue');
        expect(carCreatedResponse.body).to.have.property('seatsQty');
        expect(carCreatedResponse.body).to.have.property('doorsQty');
      })
    })
  });
})
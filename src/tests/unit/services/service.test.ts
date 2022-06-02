import { Types } from 'mongoose';
import { expect } from 'chai';
import CarShopModel from '../../../models/CarShopModel';
import CarShopService from '../../../services/CarShopService';

import Sinon from 'sinon';

describe('Test CarShopService', () => {
  let carModel = new CarShopModel();
  let carService = new CarShopService(carModel);

    describe('Test the creation of a new car with the correct data', () => {
      const validCarMock = {
        _id: new Types.ObjectId(),
        model: 'Uno da Escada',
        year: 1963,
        color: 'red',
        buyValue: 3500,
        seatsQty: 2,
        doorsQty: 2
      };
    
      before(() => {
        Sinon.stub(carModel, 'create').resolves(validCarMock);
      });
  
      after(() => {
        (carModel.create as Sinon.SinonStub).restore();
      });
  
      it('Tests whether an object is returned in the response body', async () => {
        const carCreated = await carService.create(validCarMock);
  
        expect(carCreated).to.be.an('object');
      })
  
      it('Tests if the returned object has the expected data', async () => {
        const carCreated = await carService.create(validCarMock);
  
        expect(carCreated).to.have.property('model');
        expect(carCreated).to.have.property('year');
        expect(carCreated).to.have.property('color');
        expect(carCreated).to.have.property('buyValue');
        expect(carCreated).to.have.property('seatsQty');
        expect(carCreated).to.have.property('doorsQty');
      })
    });
})
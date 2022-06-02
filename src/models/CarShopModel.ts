import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

export interface CarShopDocument extends Car, Document {}

const carShopSchema = new Schema<CarShopDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, {
  versionKey: false,
});

class CarShopModel extends MongoModel<Car> {
  constructor(public model = createModel('cars', carShopSchema)) {
    super(model);
  }
}

export default CarShopModel;
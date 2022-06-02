import { Car, carZodSchema } from '../interfaces/CarInterface';
import Service, { ServiceError } from './BaseService';
import CarShopModel from '../models/CarShopModel';

class CarShopService extends Service<Car> {
  constructor(model = new CarShopModel()) {
    super(model);
  }

  public async create(obj: Car): Promise<Car | ServiceError | null> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  }

  public async update(
    id: string,
    obj: Car,
  ): Promise<Car | null | ServiceError> {
    const parsed = carZodSchema.safeParse(obj);
    
    if (!parsed.success) return { error: parsed.error };
    return this.model.update(id, obj);
  }
}

export default CarShopService;

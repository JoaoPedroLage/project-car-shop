import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from './BaseController';
import CarShopService from '../services/CarShopService';
import { Car } from '../interfaces/CarInterface';

class CarShopController extends Controller<Car> {
  private $route: string;

  constructor(
    service = new CarShopService(),
    route = '/cars',
  ) {
    super(service);
    this.$route = route;
  }

  get route() {
    return this.$route;
  }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;

    try {
      const car = await this.service.create(body);

      if (!car) {
        return res.status(500).json({ error: this.errors.internal });
      }

      if ('error' in car) {
        return res.status(400).json(car);
      }

      return res.status(201).json(car);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: this.errors.requiredId });

    if (id.length < 24) {
      return res.status(400).json({ error: this.errors.idLength });
    }

    try {
      const car = await this.service.readOne(id);

      return car
        ? res.json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    const { body } = req;

    if (Object.keys(body).length === 0) return res.status(400).json();

    if (id.length < 24) {
      return res.status(400).json({ error: this.errors.idLength });
    }

    try {
      const car = await this.service.update(id, body);

      if (!car) return res.status(404).json({ error: this.errors.notFound });

      return res.status(200).json(car);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: this.errors.requiredId });

    if (id.length < 24) {
      return res.status(400).json({ error: this.errors.idLength });
    }

    try {
      const car = await this.service.delete(id);

      if (!car) return res.status(404).json({ error: this.errors.notFound });

      return res.status(204).json(car);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarShopController;

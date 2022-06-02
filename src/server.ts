import App from './app';

import CarShopController from './controllers/CarShopController';

import { Car } from './interfaces/CarInterface';

import CustomRouter from './routes/Router';

const server = new App();

const carController = new CarShopController();

const customRouter = new CustomRouter<Car>();
customRouter.addRoute(carController);

server.addRouter(customRouter.router);

export default server;
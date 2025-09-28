import { Router } from 'express';
import homeController from './controllers/home-controller.js';
import catalogController from './controllers/catalog-controller.js';
import authController from './controllers/auth-controller.js';
import profileController from './controllers/profile-controller.js';
import reviewController from './controllers/review-controller.js';

const routes = Router();

routes.use('/', homeController)

routes.use('/catalog', catalogController)

routes.use('/profile', profileController)

routes.use('/auth', authController)

routes.use('/reviews', reviewController)


export default routes
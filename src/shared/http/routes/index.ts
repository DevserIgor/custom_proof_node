import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';

const routes = Router();

routes.use('/products', productsRouter);

// routes.get('/products', (request, response) => {
//   return response.json({ Message: 'two' });
// });

export default routes;

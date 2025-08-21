import express from 'express';
import routes from './routes/routes';
import { schemaErrorHandler, errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());

app.use('/', routes);

app.use(schemaErrorHandler);

app.use(errorHandler);

export default app;

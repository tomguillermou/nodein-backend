import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import { dbUtils, secretUtils } from '@utils';

import { router } from './routes';

async function createApp(): Promise<express.Express> {
  const app = express();

  // Load secrets
  secretUtils.load();

  // Connect to database
  await dbUtils.connect();

  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // Enabling CORS Pre-Flight
  // app.options('*', cors()); // include before other routes

  // Plug routes
  app.use(router);

  return app;
}

export { createApp };

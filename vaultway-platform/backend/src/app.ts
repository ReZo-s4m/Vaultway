import express, { type Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env, isProd } from './config/env';
import routes from './routes';
import { notFound } from './middleware/notFound.middleware';
import { errorHandler } from './middleware/error.middleware';

export function createApp(): Application {
  const app = express();

  app.set('trust proxy', 1);

  // Security headers
  app.use(helmet());

  // CORS allow-list (credentials enabled for httpOnly refresh cookie)
  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
      credentials: true,
    }),
  );

  // Body & cookie parsing
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Request logging
  app.use(morgan(isProd ? 'combined' : 'dev'));

  // Global rate limit on the API surface
  app.use(
    '/api',
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 300,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
    }),
  );

  // Routes
  app.use('/api', routes);

  // 404 + centralized error handling
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

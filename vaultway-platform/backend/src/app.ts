import express, { type Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { env, isProd } from './config/env';
import { apiRouter } from './routes/index';
import { notFound } from './middleware/notFound.middleware';
import { errorHandler } from './middleware/error.middleware';

function allowedOrigins(): string[] {
  const fromClient = env.CLIENT_ORIGIN;
  const fromCors = (process.env.CORS_ORIGIN ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  return Array.from(new Set([fromClient, ...fromCors]));
}

function isAllowedOrigin(origin: string): boolean {
  const origins = allowedOrigins();
  if (origins.includes(origin) || origins.includes('*')) {
    return true;
  }

  try {
    const { hostname } = new URL(origin);
    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.endsWith('.vercel.app')
    );
  } catch {
    return false;
  }
}

export function createApp(): Application {
  const app = express();

  if (isProd) {
    app.set('trust proxy', 1);
  }

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || isAllowedOrigin(origin)) {
          callback(null, true);
          return;
        }
        callback(null, false);
      },
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  if (env.NODE_ENV !== 'test') {
    app.use(morgan(isProd ? 'combined' : 'dev'));
  }

  app.use('/api', apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

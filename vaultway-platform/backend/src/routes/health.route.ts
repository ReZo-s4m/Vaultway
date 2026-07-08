import { Router } from 'express';
import type { ApiResponse } from '@vaultway/shared';
import { prisma } from '../config/prisma';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    let database = 'up';
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch {
      database = 'down';
    }
    const body: ApiResponse = {
      success: true,
      message: 'Vaultway API is healthy',
      data: {
        status: 'ok',
        database,
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
      },
    };
    res.status(200).json(body);
  }),
);

export default router;

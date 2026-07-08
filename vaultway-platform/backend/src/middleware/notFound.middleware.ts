import type { Request, Response } from 'express';
import type { ApiResponse } from '@vaultway/shared';

export function notFound(req: Request, res: Response): void {
  const body: ApiResponse = {
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  };
  res.status(404).json(body);
}

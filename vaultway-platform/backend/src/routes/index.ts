import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import healthRoutes from './health.route';

export const apiRouter = Router();

apiRouter.use('/health', healthRoutes);

apiRouter.use(
  rateLimit({
    windowMs: 60_000,
    limit: 90,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  }),
);

// --- Wired in later phases (same mount style as the reference API) ---------
// apiRouter.use('/auth', authRoutes);
// apiRouter.use('/users', requireAuth, userRoutes);
// apiRouter.use('/files', requireAuth, fileRoutes);
// apiRouter.use('/folders', requireAuth, folderRoutes);
// apiRouter.use('/shares', requireAuth, shareRoutes);
// apiRouter.use('/activity', requireAuth, activityRoutes);
// apiRouter.use('/notifications', requireAuth, notifRoutes);
// apiRouter.use('/admin', requireAuth, requireRole('ADMIN'), adminRoutes);

export default apiRouter;

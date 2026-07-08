import { Router } from 'express';
import healthRoutes from './health.route';

const router = Router();

router.use('/health', healthRoutes);

// --- Wired in later phases -------------------------------------------------
// router.use('/auth', authRoutes);            // Phase 2
// router.use('/users', userRoutes);           // Phase 2
// router.use('/files', fileRoutes);           // Phase 3-4
// router.use('/folders', folderRoutes);       // Phase 3
// router.use('/shares', shareRoutes);         // Phase 5
// router.use('/activity', activityRoutes);    // Phase 5
// router.use('/notifications', notifRoutes);  // Phase 6
// router.use('/admin', adminRoutes);          // Phase 6

export default router;

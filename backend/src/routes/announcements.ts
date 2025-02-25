import express from 'express';
import { announcementController } from '../controllers/announcement.controller';
// import { authenticateUserMiddleware } from '../middleware/authMiddleware';
import multer from 'multer';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/announcements');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Validation schema
const announcementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.string().optional()
});

// Routes
router.get(
  '/list',

  announcementController.getAllAnnouncements
);

router.post(
  '/create',

  upload.single('image'),
  validateRequest(announcementSchema),
  announcementController.createAnnouncement
);

router.put(
  '/:id',

  upload.single('image'),
  validateRequest(announcementSchema.partial()),
  announcementController.updateAnnouncement
);

router.delete(
  '/:id',

  announcementController.deleteAnnouncement
);

export default router;

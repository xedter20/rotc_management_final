import express from 'express';
import { applicationController } from '../controllers/applicationController';
import multer from 'multer';
import path from 'path';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';
import fs from 'fs';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create profile-pictures directory if it doesn't exist
    const uploadDir = path.join(__dirname, '../../../uploads/profile-pictures');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      'profilePicture-' + uniqueSuffix + path.extname(file.originalname)
    );
  }
});

// Add file filter to ensure only images are uploaded
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// Validation schema
const applicationSchema = z.object({
  studentNo: z.string().min(1, 'Student No. is required'),
  ms: z.string().min(1, 'MS is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  firstName: z.string().min(1, 'First Name is required'),
  middleName: z.string().optional(),
  region: z.string().min(1, 'Region is required'),
  province: z.string().min(1, 'Province is required'),
  city: z.string().min(1, 'City is required'),
  barangay: z.string().min(1, 'Barangay is required'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 characters'),
  course: z.string().min(1, 'Course is required'),
  school: z.string().min(1, 'School is required'),
  religion: z.string().min(1, 'Religion is required'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  placeOfBirth: z.string().min(1, 'Place of Birth is required'),
  height: z.string().min(1, 'Height is required'),
  weight: z.string().min(1, 'Weight is required'),
  complexion: z.string().min(1, 'Complexion is required'),
  bloodType: z.string().min(1, 'Blood Type is required'),
  father: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  mother: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  emergencyContact: z.string().min(1, 'Emergency contact is required'),
  emergencyRelationship: z
    .string()
    .min(1, 'Emergency relationship is required'),
  emergencyAddress: z.string().min(1, 'Emergency address is required'),
  emergencyPhone: z.string().min(1, 'Emergency phone is required'),
  militaryScience: z.string().optional(),
  willingToAdvance: z.boolean()
});

// Routes
router.post(
  '/',
  upload.single('profilePicture'),
  // validateRequest(applicationSchema),
  applicationController.createApplication
);

router.get('/', applicationController.getAllApplications);
router.get('/check/:userId', applicationController.checkExistingApplication);
router.get('/user/:userId', applicationController.getUserApplication);
router.get('/:id', applicationController.getApplication);

router.put(
  '/:id',
  upload.single('profilePicture'),
  // validateRequest(applicationSchema.partial()),
  applicationController.updateApplication
);

router.patch(
  '/:id/status',
  validateRequest(
    z.object({
      status: z.enum(['pending', 'approved', 'rejected'])
    })
  ),
  applicationController.updateApplicationStatus
);

router.delete('/:id', applicationController.deleteApplication);

export default router;

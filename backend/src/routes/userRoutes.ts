import express from 'express';
import { userController } from '../controllers/userController';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';

const router = express.Router();

// Validation schemas
const userSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  middleName: z.string().optional(),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 characters'),
  dateOfBirth: z.string(),
  gender: z.enum(['Male', 'Female', 'Other']),
  region: z.string().min(1, 'Region is required'),
  province: z.string().min(1, 'Province is required'),
  city: z.string().min(1, 'City is required'),
  barangay: z.string().min(1, 'Barangay is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['cadet', 'rotc_officer', 'rotc_coordinator']).optional(),
  studentNumber: z.string().optional(),
  course: z.string().optional(),
  yearLevel: z.string().optional(),
  section: z.string().optional(),
  platoon: z.string().optional()
});

const updateUserSchema = userSchema.partial().omit({ password: true });

// Routes with validation
router.post('/register', userController.register);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put(
  '/:id',
  validateRequest(updateUserSchema),
  userController.updateUser
);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.login);
router.get('/verify-email/verify', userController.verifyEmail);
export default router;

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
// Add JWT secret to your environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const userController = {
  async register(req: Request, res: Response) {
    try {
      const {
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth,
        gender,
        region,
        province,
        city,
        barangay,
        password,
        role,
        studentNumber,
        course,
        yearLevel,
        section,
        platoon
      } = req.body;

      console.log(req.body);

      // Validate required fields
      const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'dateOfBirth',
        'gender',
        'region',
        'province',
        'city',
        'barangay',
        'password'
      ];

      const missingFields = requiredFields.filter(field => !req.body[field]);
      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(', ')}`
        });
      }

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          username: email,
          firstName,
          middleName,
          lastName,
          email,
          phoneNumber,
          dateOfBirth,
          gender,
          region,
          province,
          city,
          barangay,
          password: hashedPassword,
          role,
          studentNumber,
          course,
          yearLevel,
          section,
          platoon
        }
      });

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      // Generate verification token
      const verificationToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '1h'
      });

      // Update user with verification token
      await prisma.user.update({
        where: { id: user.id },
        data: { verificationToken }
      });

      // Send verification email
      const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: `<p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">Verify Email</a>`
      });

      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.query;
      if (!token) {
        return res.status(400).json({ message: 'Token is required' });
      }

      const decoded = jwt.verify(token as string, JWT_SECRET);
      console.log({ decoded });

      const user = await prisma.user.update({
        where: { id: decoded.userId },
        data: { isVerified: true, verificationToken: null }
      });

      res.json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error('Email verification error:', error);
      res.status(400).json({ message: 'Invalid or expired token' });
    }
  },

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          dateOfBirth: true,
          gender: true,
          region: true,
          province: true,
          city: true,
          barangay: true,
          role: true,
          studentNumber: true,
          course: true,
          yearLevel: true,
          section: true,
          platoon: true,
          createdAt: true,
          updatedAt: true
        }
      });

      // Convert dates to ISO strings for consistent formatting
      const formattedUsers = users.map(user => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }));

      res.json(formattedUsers);
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          dateOfBirth: true,
          gender: true,
          region: true,
          province: true,
          city: true,
          barangay: true,
          role: true,
          studentNumber: true,
          course: true,
          yearLevel: true,
          section: true,
          platoon: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = ({
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth,
        gender,
        region,
        province,
        city,
        barangay,
        role,
        studentNumber,
        course,
        yearLevel,
        section,
        platoon
      } = req.body);

      // Remove undefined fields from update data
      Object.keys(updateData).forEach(
        key => updateData[key] === undefined && delete updateData[key]
      );

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { id: parseInt(id) }
      });

      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if new email is already taken
      if (email && email !== existingUser.email) {
        const emailExists = await prisma.user.findUnique({
          where: { email }
        });
        if (emailExists) {
          return res.status(400).json({ message: 'Email already in use' });
        }
      }

      // Update user
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: updateData,
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          dateOfBirth: true,
          gender: true,
          region: true,
          province: true,
          city: true,
          barangay: true,
          role: true,
          studentNumber: true,
          course: true,
          yearLevel: true,
          section: true,
          platoon: true,
          createdAt: true,
          updatedAt: true
        }
      });

      res.json(updatedUser);
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = parseInt(id);

      console.log({ id });

      // Delete related applications first
      await prisma.application.deleteMany({
        where: { userId }
      });

      // Now delete the user
      const user = await prisma.user.delete({
        where: { id: userId }
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(204).send();
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          message: 'Email and password are required'
        });
      }

      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email }
      });

      console.log({ user });
      if (!user) {
        return res.status(401).json({
          message: 'Invalid email or password'
        });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          message: 'Invalid email or password'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      // Send response with token and user data
      res.json({
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const applicationController = {
  async createApplication(req: Request, res: Response) {
    try {
      const applicationData = {
        ...req.body,
        profilePicture: req.file
          ? `profile-pictures/${req.file.filename}`
          : undefined,
        willingToAdvance: req.body.willingToAdvance === 'true',
        userId: parseInt(req.body.userId)
      };

      delete applicationData.date;
      console.log('File:', req.file);
      console.log('Application Data:', applicationData);

      const application = await prisma.application.create({
        data: applicationData,
        include: {
          user: true
        }
      });

      res.status(201).json(application);
    } catch (error) {
      console.error('Error creating application:', error);
      res.status(500).json({ message: 'Failed to create application' });
    }
  },

  async getAllApplications(req: Request, res: Response) {
    try {
      const applications = await prisma.application.findMany({
        include: {
          user: true
        }
      });
      res.json(applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ message: 'Failed to fetch applications' });
    }
  },

  async getApplication(req: Request, res: Response) {
    try {
      const application = await prisma.application.findUnique({
        where: {
          id: parseInt(req.params.id)
        },
        include: {
          user: true
        }
      });

      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }

      res.json(application);
    } catch (error) {
      console.error('Error fetching application:', error);
      res.status(500).json({ message: 'Failed to fetch application' });
    }
  },

  async updateApplication(req: Request, res: Response) {
    try {
      const updateData = {
        ...req.body,
        profilePicture: req.file ? req.file.path : undefined,
        willingToAdvance: req.body.willingToAdvance === 'true',
        userId: parseInt(req.body.userId)
      };

      delete updateData.date;

      const application = await prisma.application.update({
        where: {
          id: parseInt(req.params.id)
        },
        data: updateData,
        include: {
          user: true
        }
      });

      res.json(application);
    } catch (error) {
      console.error('Error updating application:', error);
      res.status(500).json({ message: 'Failed to update application' });
    }
  },

  async deleteApplication(req: Request, res: Response) {
    try {
      await prisma.application.delete({
        where: {
          id: parseInt(req.params.id)
        }
      });

      res.json({ message: 'Application deleted successfully' });
    } catch (error) {
      console.error('Error deleting application:', error);
      res.status(500).json({ message: 'Failed to delete application' });
    }
  },

  async updateApplicationStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;

      const application = await prisma.application.update({
        where: {
          id: parseInt(req.params.id)
        },
        data: {
          status: status
        },
        include: {
          user: true
        }
      });

      res.json(application);
    } catch (error) {
      console.error('Error updating application status:', error);
      res.status(500).json({ message: 'Failed to update application status' });
    }
  },

  async checkExistingApplication(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);

      const application = await prisma.application.findFirst({
        where: { userId },
        select: { status: true }
      });

      if (!application) {
        return res
          .status(404)
          .json({ message: 'No existing application found' });
      }

      res.json({ status: application.status });
    } catch (error) {
      console.error('Error checking application:', error);
      res.status(500).json({ message: 'Failed to check application' });
    }
  },

  async getUserApplication(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);

      const application = await prisma.application.findFirst({
        where: { userId },
        include: {
          user: true
        }
      });

      if (!application) {
        return res
          .status(404)
          .json({ message: 'No existing application found' });
      }

      res.json(application);
    } catch (error) {
      console.error('Error fetching user application:', error);
      res.status(500).json({ message: 'Failed to fetch user application' });
    }
  }
};

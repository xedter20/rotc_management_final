import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const announcementController = {
  // Get all announcements
  async getAllAnnouncements(req: Request, res: Response) {
    try {
      const announcements = await prisma.announcement.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });
      res.json(announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      res.status(500).json({ message: 'Failed to fetch announcements' });
    }
  },

  // Create announcement
  async createAnnouncement(req: Request, res: Response) {
    try {
      const { title, content, priority } = req.body;
      const userId = (req as any).user?.id || 1; // Fallback for testing

      let imageUrl = null;
      if ((req as any).file) {
        imageUrl = (req as any).file.path;
      }

      const announcement = await prisma.announcement.create({
        data: {
          title,
          content,
          priority,
          imageUrl,
          userId,
          updatedAt: new Date()
        }
      });

      // Send email notifications
      const recipients = await prisma.user.findMany({
        where: {
          role: 'cadet'
        },
        select: {
          email: true
        }
      });

      await Promise.all(
        recipients.map(recipient =>
          sendAnnouncementEmail(recipient.email, {
            title,
            content,
            senderName:
              (req as any).user?.firstName +
                ' ' +
                (req as any).user?.lastName || 'System'
          })
        )
      );

      res.status(201).json(announcement);
    } catch (error) {
      console.error('Error creating announcement:', error);
      res.status(500).json({ message: 'Failed to create announcement' });
    }
  },

  // Update announcement
  async updateAnnouncement(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content, priority } = req.body;

      let imageUrl = undefined;
      if ((req as any).file) {
        imageUrl = (req as any).file.path;
      }

      const announcement = await prisma.announcement.update({
        where: { id: Number(id) },
        data: {
          title,
          content,
          priority,
          imageUrl,
          updatedAt: new Date()
        }
      });

      res.json(announcement);
    } catch (error) {
      console.error('Error updating announcement:', error);
      res.status(500).json({ message: 'Failed to update announcement' });
    }
  },

  // Delete announcement
  async deleteAnnouncement(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.announcement.delete({
        where: { id: Number(id) }
      });

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting announcement:', error);
      res.status(500).json({ message: 'Failed to delete announcement' });
    }
  }
};

// Helper function to send announcement emails
const sendAnnouncementEmail = async (
  recipientEmail: string,
  announcementData: {
    title: string;
    content: string;
    senderName: string;
  }
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: `New Announcement: ${announcementData.title}`,
    html: `
      <h2>${announcementData.title}</h2>
      <p>${announcementData.content}</p>
      <p>Posted by: ${announcementData.senderName}</p>
    `
  };

  //await transporter.sendMail(mailOptions);
};

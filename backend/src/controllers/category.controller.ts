import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const categoryController = {
  // Get all categories
  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany({
        include: {
          _count: {
            select: {
              products: true
            }
          }
        }
      });
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching categories' });
    }
  },

  // Get single category
  async getCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          products: true,
          _count: {
            select: {
              products: true
            }
          }
        }
      });

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching category' });
    }
  },

  // Create category
  async createCategory(req: Request, res: Response) {
    try {
      const { name, description } = req.body;

      const existingCategory = await prisma.category.findUnique({
        where: { name }
      });

      if (existingCategory) {
        return res.status(400).json({ error: 'Category already exists' });
      }

      const category = await prisma.category.create({
        data: {
          name,
          description
        }
      });

      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Error creating category' });
    }
  },

  // Update category
  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      if (name) {
        const existingCategory = await prisma.category.findFirst({
          where: {
            name,
            id: { not: id }
          }
        });

        if (existingCategory) {
          return res
            .status(400)
            .json({ error: 'Category name already exists' });
        }
      }

      const category = await prisma.category.update({
        where: { id },
        data: {
          name,
          description
        }
      });

      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Error updating category' });
    }
  },

  // Delete category
  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if category has products
      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              products: true
            }
          }
        }
      });

      if (category?._count.products > 0) {
        return res.status(400).json({
          error: 'Cannot delete category with associated products'
        });
      }

      await prisma.category.delete({
        where: { id }
      });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting category' });
    }
  }
};

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const productController = {
  // Get all products
  async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await prisma.product.findMany({
        include: {
          colors: true,
          sizes: true
        }
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  },

  // Get single product
  async getProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await prisma.product.findUnique({
        where: { id }
        // include: {
        //   colors: true,
        //   sizes: true
        // }
      });

      console.log({ product });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching product' });
    }
  },

  // Create product
  async createProduct(req: Request, res: Response) {
    try {
      const { colors, sizes, ...productData } = req.body;

      const product = await prisma.product.create({
        data: {
          ...productData,
          colors: {
            create: colors
          },
          sizes: {
            create: sizes
          }
        },
        include: {
          colors: true,
          sizes: true
        }
      });

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error creating product' });
    }
  },

  // Update product
  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { colors, sizes, ...productData } = req.body;

      // Delete existing colors and sizes
      await prisma.productColor.deleteMany({
        where: { productId: id }
      });
      await prisma.productSize.deleteMany({
        where: { productId: id }
      });

      // Update product with new data
      const product = await prisma.product.update({
        where: { id },
        data: {
          ...productData,
          colors: {
            create: colors
          },
          sizes: {
            create: sizes
          }
        },
        include: {
          colors: true,
          sizes: true
        }
      });

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error updating product' });
    }
  },

  // Delete product
  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Delete related colors and sizes first
      await prisma.productColor.deleteMany({
        where: { productId: id }
      });
      await prisma.productSize.deleteMany({
        where: { productId: id }
      });

      // Delete the product
      await prisma.product.delete({
        where: { id }
      });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting product' });
    }
  }
};

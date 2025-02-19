/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_colors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_sizes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product_colors` DROP FOREIGN KEY `product_colors_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_sizes` DROP FOREIGN KEY `product_sizes_productId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_categoryId_fkey`;

-- DropTable
DROP TABLE `categories`;

-- DropTable
DROP TABLE `product_colors`;

-- DropTable
DROP TABLE `product_sizes`;

-- DropTable
DROP TABLE `products`;

-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- First create a default category
INSERT INTO `categories` (`id`, `name`, `description`, `createdAt`, `updatedAt`)
VALUES (
    'default-category',
    'Uncategorized',
    'Default category for existing products',
    CURRENT_TIMESTAMP(3),
    CURRENT_TIMESTAMP(3)
);

-- Add categoryId column as nullable first
ALTER TABLE `products` ADD COLUMN `categoryId` VARCHAR(191) NULL;

-- Update existing products to use the default category
UPDATE `products` SET `categoryId` = 'default-category' WHERE `categoryId` IS NULL;

-- Now make categoryId required
ALTER TABLE `products` MODIFY COLUMN `categoryId` VARCHAR(191) NOT NULL;

-- Add the foreign key constraint
ALTER TABLE `products` ADD CONSTRAINT `products_categoryId_fkey`
FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE; 
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const categories = [
  {
    name: 'Chairs',
    description: 'Comfortable and stylish chairs for your home'
  },
  {
    name: 'Sofas',
    description: 'Luxurious sofas and couches for your living room'
  },
  {
    name: 'Tables',
    description: 'Dining, coffee, and side tables for every room'
  },
  {
    name: 'Beds',
    description: 'Comfortable beds and bed frames for your bedroom'
  },
  {
    name: 'Storage',
    description: 'Wardrobes, cabinets, and storage solutions'
  },
  {
    name: 'Lighting',
    description: 'Lamps, ceiling lights, and other lighting fixtures'
  },
  {
    name: 'Decor',
    description: 'Decorative items to enhance your home'
  }
];

async function main() {
  try {
    console.log('Start seeding...');

    // Create Battalion Group
    const battalion = await prisma.battalionGroup.create({
      data: {
        battalionName: 'First Battalion',
        location: 'Main Campus',
        commander: 'Col. James Smith'
      }
    });

    console.log('Created battalion:', battalion);

    // Delete existing users with these roles to avoid duplicates
    await prisma.user.deleteMany({
      where: {
        role: {
          in: ['rotc_officer', 'rotc_coordinator']
        }
      }
    });

    // Create ROTC Officer
    const officerPassword = await bcrypt.hash('password123', 10);
    const officer = await prisma.user.create({
      data: {
        username: 'rotc.officer@example.com',
        email: 'rotc.officer@example.com',
        password: officerPassword,
        firstName: 'John',
        lastName: 'Officer',
        phoneNumber: '09123456789',
        dateOfBirth: '1990-01-01',
        gender: 'Male',
        region: 'NCR',
        province: 'Metro Manila',
        city: 'Manila',
        barangay: 'Sampaloc',
        role: 'rotc_officer',
        course: 'Military Science',
        yearLevel: '4th',
        section: 'A',
        platoon: 'Alpha',
        officerInfo: {
          create: {
            cadetRank: 'Captain',
            unit: 'Alpha Company',
            battalionId: battalion.id
          }
        }
      }
    });

    // Create ROTC Coordinator
    const coordinatorPassword = await bcrypt.hash('password123', 10);
    const coordinator = await prisma.user.create({
      data: {
        username: 'rotc.coordinator@example.com',
        email: 'rotc.coordinator@example.com',
        password: coordinatorPassword,
        firstName: 'Jane',
        lastName: 'Coordinator',
        phoneNumber: '09987654321',
        dateOfBirth: '1985-01-01',
        gender: 'Female',
        region: 'NCR',
        province: 'Metro Manila',
        city: 'Manila',
        barangay: 'Sampaloc',
        role: 'rotc_coordinator',
        course: 'Military Science',
        yearLevel: '4th',
        section: 'A',
        platoon: 'Alpha',
        cadetInfo: {
          create: {
            firstName: 'Jane',
            lastName: 'Coordinator',
            dateOfBirth: new Date('1985-01-01'),
            gender: 'female',
            bloodType: 'a',
            address: 'Manila',
            contactNumber: '09987654321',
            enrollmentStatus: 'active',
            cadetRank: 'Coordinator',
            battalionId: battalion.id
          }
        }
      }
    });

    // Create a sample cadet user
    const cadetPassword = await bcrypt.hash('password123', 10);
    const cadet = await prisma.user.create({
      data: {
        username: 'cadet@example.com',
        email: 'cadet@example.com',
        password: cadetPassword,
        firstName: 'Sample',
        lastName: 'Cadet',
        phoneNumber: '09123456788',
        dateOfBirth: '2000-01-01',
        gender: 'Male',
        region: 'NCR',
        province: 'Metro Manila',
        city: 'Manila',
        barangay: 'Sampaloc',
        role: 'cadet',
        course: 'Computer Science',
        yearLevel: '2nd',
        section: 'B',
        platoon: 'Bravo',
        cadetInfo: {
          create: {
            firstName: 'Sample',
            lastName: 'Cadet',
            dateOfBirth: new Date('2000-01-01'),
            gender: 'male',
            bloodType: 'b',
            address: 'Manila',
            contactNumber: '09123456788',
            enrollmentStatus: 'active',
            cadetRank: 'Cadet',
            battalionId: battalion.id
          }
        }
      }
    });

    console.log({
      battalion,
      officer,
      coordinator,
      cadet
    });

    console.log('Seeding finished.');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

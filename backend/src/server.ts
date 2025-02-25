import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';
import userRoutes from './routes/userRoutes';
import applicationRoutes from './routes/applicationRoutes';
import announcementRoutes from './routes/announcements';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create necessary directories
const uploadsDir = path.join(__dirname, '../../uploads');
const profilePicturesDir = path.join(uploadsDir, 'profile-pictures');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(profilePicturesDir)) {
  fs.mkdirSync(profilePicturesDir, { recursive: true });
}

// Serve static files from the uploads directory
app.use('/api/uploads', express.static(uploadsDir));

// Routes
// app.use('/', (req, res) => {
//   res.send('Hello World');
// });

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

app.use('/api/users', userRoutes);

app.use('/api/applications', applicationRoutes);
app.use('/api/announcements', announcementRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './configs/db.js';

import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// ✅ Connect Database
await connectDB();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Test Route
app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});

// ✅ Routes
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);
app.use('/api/auth', authRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
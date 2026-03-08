// server.js
import dotenv from 'dotenv';
dotenv.config(); // ✅ First line after dotenv import

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

console.log('🚀 Starting server initialization...');

// Import routes
import authRoutes from './routes/authRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';
import payrollRoutes from './routes/payrollRoutes.js';
import performanceRoutes from './routes/performanceRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import bankAccountRoutes from './routes/bankAccountRoutes.js';
import deliveryRoutes from './routes/deliveryRoutes.js';
import inventoryMovementRoutes from './routes/inventoryMovementRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import crmRoutes from './routes/crmRoutes.js';
import salesRoutes from './routes/salesRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';

const app = express();

connectDB();

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || "https://erp-main-kappa.vercel.app",
  credentials: true
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📞 ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/payrolls', payrollRoutes);
app.use('/api/performances', performanceRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/bank-accounts', bankAccountRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/inventory-movements', inventoryMovementRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/inventory', inventoryRoutes);

app.get('/', (req, res) => {
  res.send('🚀 ERP Backend is running');
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  console.error('💥 Server error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

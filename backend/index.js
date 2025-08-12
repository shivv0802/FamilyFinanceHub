require('dotenv').config();
const express = require('express');
const app = express();
const connectDb = require('./config/db');
const errorHandler = require('./middleware/errorHandler.middleware');

const PORT = process.env.PORT || 8000;

// Import routes
const userRoutes = require('./routes/user.route');
const familyGroupRoutes = require('./routes/familyGroup.route');
const familyUserRoutes = require('./routes/familyUser.route');
const familyTransactionRoutes = require('./routes/financialTransaction.route');


// Middleware
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Family Finance Hub API');
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/family-groups', familyGroupRoutes);
app.use('/api/family-users',  familyUserRoutes);
app.use('/api/transactions', familyTransactionRoutes);




// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDb("mongodb://localhost:27017/familyfinancehub");
    app.listen(8000, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
};

startServer();

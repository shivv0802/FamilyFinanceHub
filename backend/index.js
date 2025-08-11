require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/user.route');
const connectDb = require('./config/db');
const errorHandler = require('./middleware/errorHandler.middleware');
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Family Finance Hub API');   
});

app.use(express.json());
app.use('/api/users', userRoutes);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDb(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
};

startServer();
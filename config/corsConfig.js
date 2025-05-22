const dotenv = require('dotenv');
dotenv.config();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://127.0.0.1:5500',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

module.exports = corsOptions
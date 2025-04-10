import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from './lib/db.js';
import RouterApp from './routes/authRoutes.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

// ✅ PROPER CORS SETUP
const allowedOrigins = [
  'http://localhost:3000', // frontend dev
  'https://cv-shot-backend.vercel.app', // backend on Vercel
  'https://your-frontend.vercel.app' // replace this with your real frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(' Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());

ConnectDB();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the backend',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'https://cv-shot-backend.vercel.app'
          : `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Redirect root to Swagger UI
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Routes
app.use(RouterApp);

// Start server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});

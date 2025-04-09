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

app.use(cors());
app.use(express.json());

// DB Connection
ConnectDB();

// Swagger setup
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
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Swagger route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Redirect root to Swagger
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Routes
app.use(RouterApp);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

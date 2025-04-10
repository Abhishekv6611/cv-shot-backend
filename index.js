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

app.use(cors({
  origin: ['http://localhost:5050', 'https://cv-shot-backend.vercel.app'], // Add allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add allowed HTTP methods
  credentials: true, // Allow credentials if needed
}));

app.use(express.json());

// DB Connection
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
        url: `http://localhost:${PORT}`,
      },{
        url:`https://cv-shot-backend.vercel.app/`
      },
    ],
  },
  apis: ['./routes/*.js'], // Ensure this path is correct
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

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

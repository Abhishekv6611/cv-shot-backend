import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from './lib/db.js';
import RouterApp from './routes/authRoutes.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser'
import path from 'path'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;
const __dirname = path.resolve();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
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
        description:"Local"
      },{
        url:`https://cv-shot-backend.vercel.app`,
        description:"Production"
      }
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/api-docs', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist')));
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

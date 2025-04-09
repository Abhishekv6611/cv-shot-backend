// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import ConnectDB from '../lib/db.js'
// import RouterApp from '../view/authView.js' 
// import serverless from 'serverless-http';
// dotenv.config()
// const app=express()

// app.use(cors())
// app.use(express.json())


// ConnectDB()
// app.use(RouterApp)

// if (process.env.NODE_ENV !== 'production') {
//     const PORT = process.env.PORT || 5050
//     app.listen(PORT, () => {
//       console.log(`Server is running locally on port ${PORT}`)
//     })
//   }


//   export default serverless(app); 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from '../lib/db.js';
import RouterApp from '../view/authView.js';
import serverless from 'serverless-http';

dotenv.config();
console.log('🟢 Starting Serverless Function');

const app = express();
app.use(cors());
app.use(express.json());

try {
  console.log('🟠 Connecting to DB...');
  await ConnectDB();
  console.log('✅ MongoDB connected');
} catch (err) {
  console.error('❌ DB connection failed:', err);
}

app.use('/auth', RouterApp);

app.get('/home', (req, res) => {
  console.log('✅ /home route hit');
  res.json({ message: 'Home Route Working 🚀' });
});

export default serverless(app);


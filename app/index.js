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



app.use('/auth', RouterApp);

app.get("/", async (req, res) => {
  try {
    await ConnectDB();
    res.status(200).json({ message: "MongoDB connected and API is working!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default serverless(app);


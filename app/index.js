// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import ConnectDB from '../lib/db.js'
// import RouterApp from '../view/authView.js' 
// import ServerlessHttp from 'serverless-http'
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


// export const handler = ServerlessHttp(app); 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import ConnectDB from '../lib/db.js';
import RouterApp from '../view/authView.js';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ConnectDB();
app.use('/auth',RouterApp);

app.get('/home',(req,res)=>{
  res.json({message:"Home"})
})

export default serverless(app);

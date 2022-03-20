import dotenv from 'dotenv'
dotenv.config();
import express from 'express'

import cors from 'cors'
import connectDb from './config/connectdb.js';
import userRoutes from './routes/userRoutes.js';
//DB connection
const port = process.env.PORT;
connectDb();

//josn return
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoutes)
app.listen(port, () =>{
    console.log(`Server listening at http://localhost:${port}`)
}) 
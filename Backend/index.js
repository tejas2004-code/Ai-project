import express from 'express';
import dotenv from 'dotenv';
import { DBConnection } from './Utils/DConnection.js';
import AuthRoutes from './Routes/Route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Resumerouter from './Routes/ResumeRoute.js';
import bodyParser from 'body-parser';
import { upload, UploadImage } from './Controller/CloundnaryUploadImage.js';



dotenv.config();

const app=express();
const port=3000;
DBConnection();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));  
app.use(cookieParser());
app.use(
    cors({
      origin:"http://localhost:3001", 
      credentials: true, 
    })
  );

app.use("/api/v1",AuthRoutes);
app.use("/api/v1/resume", Resumerouter);

const router=express.Router();
router.post("/image/upload", upload.single("image"), UploadImage);
app.use("/api/v1", router);


app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})
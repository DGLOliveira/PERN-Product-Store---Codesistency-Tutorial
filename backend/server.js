import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());// helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev"));// log the requests



app.get("/test",(req, res)=>{
    console.log(res.getHeaders())
    res.send("Test Page")
})

app.listen(PORT, ()=>{
    console.log("Server is running in port " + PORT)
})
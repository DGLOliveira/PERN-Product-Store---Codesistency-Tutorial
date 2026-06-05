import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import {sql} from "./config/db.js"
import productRoute from "./routers/products.route.js"


dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());// helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev"));// log the requests


app.use("/api/products",productRoute)

async function initDB(){
    try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initDB", error);
  }
}

app.get("/test",(req, res)=>{
    console.log(res.getHeaders())
    res.send("Test Page")
})

initDB().then(app.listen(PORT, ()=>{
    console.log("Server is running in port " + PORT)
}))
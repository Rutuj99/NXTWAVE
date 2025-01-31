import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Connect from "./Connection/Connect.js";
import authRoutes from "./Routes/auht.routes.js";

let app=express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use("/auth",authRoutes);

app.get("/",(req,res)=>{
     res.send("alll ok")
})


Connect().then(()=>{
    app.listen(3000,()=>{
           console.log("Server is running on http://localhost:3000")
    })
})
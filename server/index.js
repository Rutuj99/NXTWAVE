import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Connect from "./Connection/Connect.js";
import authRoutes from "./Routes/auht.routes.js";
import User from "./Model/User.model.js";
import router from "./Routes/otp.routes.js";

let app=express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use("/auth",authRoutes);
app.use("/",router);

app.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


Connect().then(()=>{
    app.listen(3000,()=>{
           console.log("Server is running on http://localhost:3000")
    })
})
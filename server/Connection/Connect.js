import mongoose from "mongoose";


export default async function Connect(){
       await mongoose.connect(process.env.DBLINK);
       console.log("Connected to DB...");
}
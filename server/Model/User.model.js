import mongoose from "mongoose";

let UserSchema=new mongoose.Schema({
       firstName:{
          type:String,
          required:true
       },
       lastName:{
            type:String,
            required:true
       },
       email:{
         type:String,
         required:true
       },
       location:{
          type:String,
          required:true
       },
       password:{
         type:String,
         required:true,
         min:8
       }
}, {
  timestamps: true 
})

let User=mongoose.model("user",UserSchema);

export default User;
import mongoose from "mongoose";
const UserSchema=mongoose.Schema({
    username:{
        type:String,
        required: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,   
      },
      password: {
        type: String,
       

      },
      profilePic:{
     type:String,
     default: '',
  
      },
      resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume", 
      },
     
      createdAt: {
        type: Date,
        default: Date.now,  
      },
});
export const User=mongoose.model("User",UserSchema);
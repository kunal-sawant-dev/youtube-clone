import mongoose from "mongoose";

const userSchema = mongoose.Schema({

  name:String,
  email:String,
  password:String,

  plan:{
    type:String,
    default:"free"
  },

  watchLimit:{
    type:Number,
    default:300
  }

},{timestamps:true});

export default mongoose.model("User", userSchema);
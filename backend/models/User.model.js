import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name:{type:String,default:"User"},
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profilePic:{type:String , default:"https://res.cloudinary.com/ddvcavhob/image/upload/v1751982033/boy_nhzrc3.png"}
});

const User = mongoose.model("User", userSchema);
export default User;

// default:"https://res.cloudinary.com/ddvcavhob/image/upload/v1751982033/boy_nhzrc3.png"},
import mongoose from "mongoose";

const googleuserschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    
},{timestamps:true});


const google =mongoose.model('google',googleuserschema);
export default google;
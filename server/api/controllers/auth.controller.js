import User from "../../models/user_models.js";
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"



    export const signup =async(req,res,next)=>{
    const {username,email,password}=req.body;
    const hashedpassword=bcrypt.hashSync(password,10);
    const newUser=new User({username,email,password:hashedpassword})
    try {
        await newUser.save();
        res.status(201).json({message:"User Created successfully"});
    } catch (error) {
       next(error)
    }

}

export const signin =async(req,res,next)=>{
    const {email,password}=req.body
    try {
    const user=await User.findOne({email})
    if(!user) return next(errorHandler(401,'User Is Not Found'));
    const validpassword=await bcrypt.compare(password,user.password);
    if(!validpassword) return next(errorHandler(401,'Invalid Password'));
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
    const {password:hashedpassword,...rest}=user._doc;
    const expiryDate=new Date(Date.now() +3600000); //1hour
    res.cookie("access_token",token,{httpOnly:true,secure: true,expires:expiryDate}).status(200).json({...rest,message:"Login successfuly",access_token:token});
} catch (error) {
    next(error);
}
}



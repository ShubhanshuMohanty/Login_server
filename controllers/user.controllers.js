import { User } from "../models/user.model.js";
import { TryCatch } from "../utils/TryCatchHandler.js";


const createUser=TryCatch(async(req,res,next)=>{
    const {name,email,bio,password} = req.body;
    console.log("name: " + name, "email: " + email, "password: " + password, "bio: " + bio);
    
    const user=await User.create({name, email, bio, password});
    return res.json({name, email, bio, password});
});

const login=()=>{}
export{
    createUser,
    login,
}
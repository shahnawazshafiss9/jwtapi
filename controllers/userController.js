import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
class UserController {
    static userRegistration = async (req, res) =>{
        const {name, email, password, password_confirmation, tc} = req.body;
        const user = await UserModel.findOne({email: email});
        if(user){
            res.status(201).send({"status": 'failded', "message": "Email already exists"});
        }else{
            if(name && email && password && password_confirmation && tc){
                if(password === password_confirmation){
                    try{
                        const salt =  await bcrypt.genSalt(10);
                        const hashpwd = await bcrypt.hash(password, salt);
                        const doc = new UserModel({
                            name: name,
                            email: email,
                            password: hashpwd,
                            tc: tc
                        })
                        await doc.save();
                        const saved_user = await UserModel.findOne({email:email});
                        // Generate JWT Token
                        const token = jwt.sign({userID: saved_user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '5d'});
                        res.status(200).send({"status": "success","msessage": "User has been created successfully", "token": token});
                    }catch(err){
                        res.status(201).send({"status" : "failed", "message": "unable to save"});
                    }
                }else{
                    res.send({"status": "failed","message": "Password and confirm password dont's match"})
                }
            }else{
                res.send({"status": "failed", "message": "All fields are required!"})
            }
        }

    }
    static userLogin = async (req, res) => {
        try{
            const {email, password} = req.body;
            const user = await UserModel.findOne({email: email});
            if(email && password){
                if(user != null){
                    const isMatch = await bcrypt.compare(password, user.password);
                    if(user.email === email && isMatch){
                        const saved_user = await UserModel.findOne({email:email});
                         // Generate JWT Token
                         const token = jwt.sign({userID: saved_user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '5d'});
                        res.send({"status": "success", "message": "Login Success", "token": token})
                    }else{
                        res.send({"status": "failed", "message": "Email or Password is not valid!"})
                    }
                }
            }else{
                res.send({"status": "failed", "message": "All fields are required!"})
            }
        }catch(err){
            console.log(err);
        }
    }
    static changeUserPassword = async (req, res) => {
        try{
            const { password, password_confirmation} = req.body
            if(password && password_confirmation){
                if(password !== password_confirmation){
                    res.send({"status": "failed", "message": "New Password and Confirm New Password dont's match!"}) 
                }else{
                 const salt = await bcrypt.genSalt(10);
                 const newHashPassword = await bcrypt.hash(password, salt);
                 await UserModel.findByIdAndUpdate(req.user._id, {$set: {password: newHashPassword}})
                 res.send({"status": "success", "message": "Password changed succesfully!"});
                }

            }else{
                res.send({"status": "failed", "message": "All fields are required!"})
            }

        }catch(err){
            res.send({"status": "failed", "message": "Something went worng!"})
        }
    }
    static loggedUser = async (req, res) => {
        try{  
            res.send({"user": req.user})
        }catch(err){
            res.send({"status": "failed", "message": "Something went worng!"})
        }
    }
}
export default UserController;
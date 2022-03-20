import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js'

var checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers
    if(authorization && authorization.startsWith('Bearer')){
         try{
             token = authorization.split(' ')[1]
             //verify token
             const {userID} = jwt.verify(token, process.env.JWT_SECRET_KEY)
             //Gert user from token
             console.log(userID)
             req.user = await UserModel.findById(userID).select('-password')
             next()
         }catch(err){
             console.log(err)
             res.status(401).send({"status": "Unauthorized User"})
         }
    }
    if(!token){
        res.status(401).send({"status": "Unauthorized User No token"})
    }

}

export  default checkUserAuth;
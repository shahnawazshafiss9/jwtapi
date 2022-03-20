import mongoose from 'mongoose';
//defining Schema
const userSchma = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    tc: {type: Boolean, required:true}
});
const UserModel = mongoose.model('User', userSchma);
export default UserModel;
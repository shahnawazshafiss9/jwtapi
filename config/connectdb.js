import mongoose from 'mongoose'
const connectDb = async () => {
    try{
        let DATABASE_URL = process.env.DATABASE_URL;
        const DB_OPTIONS = {
            dbName: "jwtapi"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS)
        console.log("Connected Successfully.")
    }catch(err){
        console.log(err)
    }

}
export default connectDb;
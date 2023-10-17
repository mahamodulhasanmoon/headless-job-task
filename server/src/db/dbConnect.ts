import mongoose from "mongoose";
export default  async function dbConnect (uri:string ){
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB')
        return mongoose.connection;
      } catch (error) {
       throw new Error(error.message);
      } 

      
}
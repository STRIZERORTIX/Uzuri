import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(!process.env.MONGO_URI){
    throw new Error('MONGO_URI is not defined');
  }
  if(isConnected){
    return console.log('Using existing database connection');
  }
  try{
    await mongoose.connect(process.env.MONGO_URI)
    isConnected = true;
    console.log('Database connected successfully');
  }catch(error:any){
    throw new Error(`Failed to connect to database: ${error}`)
  }
}
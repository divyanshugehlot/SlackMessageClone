import mongoose from "mongoose";

import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from "./serverConfig.js";

export default async function connectDB() { 
  try {
   if(NODE_ENV==="development"){
      await mongoose.connect(DEV_DB_URL)
    }
    else if(NODE_ENV==="production"){
        await mongoose.connect(PROD_DB_URL)
    }
  
    console.log(`MongoDB connected successfully in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("MongoDB connection failed", error);
   
  }
}

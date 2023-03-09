import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI)
let db = mongoose.connection

export default db


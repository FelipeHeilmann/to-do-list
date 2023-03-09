import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        id: {type: String},
        title:{
            type: String,
            required: true
        },
        status:{
            type: String,
            required: true
        },
        createdAt:{
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
)

const tasks = mongoose.model('tasks', taskSchema)
export default tasks
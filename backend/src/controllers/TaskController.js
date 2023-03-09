import tasks from "../modules/taskModule.js";

class TaskController{
    static getAll = async (req,res)=>{
        const resultFind = await tasks.find({})
        res.status(200).json(resultFind)
    }

    static getById = async(req,res)=>{
        const {id} = req.params
        try{
            const resultFind = await tasks.findById(id).exec()
            res.status(200).json(resultFind)
        }
        catch(error){
            res.status(400).json({message: `id ${id} was not found`})
        }
    }

    static insertTask = async(req,res)=>{
        let task = new tasks(req.body)
        try{
            await task.save()
            res.status(200).json(task)
        }
        catch(error){
            res.status(500).json(error.message)
        }
    }

    static uptadeTask = async(req,res)=>{
        const {id} = req.params
        try{
            await tasks.updateOne({_id: id}, {$set: req.body})
            res.status(200).json({message: `item ${id} was chenged`})
        }
        catch(error){
            res.status(500).json(error.message)
        }
    }

    static deleteTask = async(req,res)=>{
        const {id} = req.params
        try{
            await tasks.deleteOne({_id: id})
            res.status(200).json({message: `item ${id} was deleted`})
        }
        catch(error){
            res.status(400).json(`id ${id} was not found`)
        }
    }
}

export default TaskController
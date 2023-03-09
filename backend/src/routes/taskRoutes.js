import express, { Router } from "express";
import TaskController from "../controllers/taskController.js";

const router = Router()

router
    .get('/tasks', TaskController.getAll)
    .get('/tasks/:id',TaskController.getById)
    .post('/tasks', TaskController.insertTask)
    .put('/tasks/:id', TaskController.uptadeTask)
    .delete('/tasks/:id', TaskController.deleteTask)

export default router
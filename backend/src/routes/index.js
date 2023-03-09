import express from 'express'
import tasks from './taskRoutes.js'

const routes = (app) =>{
    app.use(tasks)
    app.route('/').get((req,res)=>{
        res.status(200).json({message: `pagina principal`})
    })
}

export default routes
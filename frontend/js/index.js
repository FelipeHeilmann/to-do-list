const fatchTasks = async()=>{
   const response = await fetch('http://localhost:3333/tasks')
   console.log(response)
}

fatchTasks()
const tbody = document.querySelector('tbody')
const addForm = document.querySelector('.add-form')
const inputTask = document.querySelector('.input-task')

const fatchTasks = async()=>{
   const response = await fetch('http://localhost:3333/tasks')
   const tasks = await response.json()
    return tasks
}

const addTask = async(event)=>{
    event.preventDefault()
    const task = {
        title: inputTask.value,
    }
    
    await fetch('http://localhost:3333/tasks', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      loadTasks()
      inputTask.value = ''
      
}

const deleteTasks = async(id)=>{
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'delete'
    })  
    loadTasks()
}

const updateTask = async({_id, title, status})=>{
    await fetch(`http://localhost:3333/tasks/${_id}`,{
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title,status})
    })
    loadTasks()

}

const formatDate = (dateUTC)=>{
    const options = {dateStyle: 'long', timeStyle: 'short'}
    const date = new Date(dateUTC).toLocaleString('pt-br' , options)
    return date
}


const createElement = (tag, innerText = '', innerHTML = '')=>{
    const element = document.createElement(tag)
    if(innerText){
        element.innerText = innerText
    }
    if(innerHTML){
        element.innerHTML = innerHTML
    }
    return element
}

const createSelect = (value)=>{
    const options = `
        <option value="pendente">pendente</option>
        <option value="em andamento">em andamento</option>
        <option value="concluída">concluída</option>
    `
    const select = createElement('select', '', options)
    select.value = value
    return select
}

const createRow = (tasks)=>{
    const {_id, title, created_at, status} = tasks
    const tr = createElement('tr')
    const tdTile = createElement('td', title)  
    const tdCreatedAt = createElement('td', formatDate(created_at))
    const tdStatus = createElement('td')
    const select = createSelect(status)
    const tdActions= createElement('td')
    const editButton = createElement('button','', '<span class="material-symbols-outlined">edit</span>')
    const deleteButton =  createElement('button','', '<span class="material-symbols-outlined">delete</span>')
    const editForm = createElement('form')
    const editInput = createElement('input')

    editInput.value = title
    editButton.classList.add('btn-action')
    deleteButton.classList.add('btn-action')  

    select.addEventListener('change', ({ target }) => updateTask({ ...tasks, status: target.value }))
    editButton.addEventListener('click', ()=>{
        tdTile.innerText = ''
        tdTile.appendChild(editForm)
    })
    editForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        updateTask({_id, title: editInput.value, status})
    })
    deleteButton.addEventListener('click', ()=>{
        deleteTasks(_id)
    })
    
    editForm.appendChild(editInput)
    tdStatus.appendChild(select)
    tdActions.appendChild(editButton)
    tdActions.appendChild(deleteButton)
    tr.appendChild(tdTile)
    tr.appendChild(tdCreatedAt)
    tr.appendChild(tdStatus)
    tr.appendChild(tdActions)

    return tr
}

const loadTasks = async()=>{
    const tasks = await fatchTasks()
    tbody.innerHTML = ''

    tasks.forEach((task) => {
        const tr = createRow(task)
        tbody.appendChild(tr)
    })
}

addForm.addEventListener('submit', addTask)

loadTasks()
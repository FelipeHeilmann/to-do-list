const tbody = document.querySelector('tbody')
const fatchTasks = async()=>{
   const response = await fetch('http://localhost:3333/tasks')
   const tasks = await response.json()
    return tasks
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
    const {id, title, created_at, status} = tasks
    const tr = createElement('tr')
    const tdTile = createElement('td', title)  
    const tdCreatedAt = createElement('td', created_at)
    const tdStatus = createElement('td')
    const select = createSelect(status)
    const tdActions= createElement('td')
    const editButton = createElement('button','', '<span class="material-symbols-outlined">edit</span>')
    const deleteButton =  createElement('button','', '<span class="material-symbols-outlined">delete</span>')
    
    editButton.classList.add('btn-action')
    deleteButton.classList.add('btn-action')  
    
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
    tasks.forEach((task) => {
        const tr = createRow(task)
        tbody.appendChild(tr)
    })
}

loadTasks()
let ul = document.querySelector('.todo-list ul')
const addTaskForm = document.querySelector('.input form')
const formInput = document.getElementById('task-text')

// if there was a stored tasks show thim 
let tasks = JSON.parse(localStorage.getItem('tasks')) || []

if (tasks.length > 0) {
    tasks.forEach(task => {
        addItem(task)
    });
}
// 
addTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    if (formInput.value === '') return
    newTask = { id: new Date().getTime(), text: formInput.value, done: 'flase' }
    tasks.push(newTask)
    addItem(newTask)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    formInput.value = ""
})


function addItem(task) {
    const li = document.createElement('li')
    li.dataset.done = task.done

    const checkboxbtn = document.createElement('span')
    checkboxbtn.classList.add('checkbox')
    // switch done checkmark
    checkboxbtn.addEventListener('click', e => {
        if (li.dataset.done === 'true') {
            li.dataset.done = 'flase'
            task.done = false

        }
        else {
            li.dataset.done = 'true'
            task.done = true
        }
        localStorage.setItem('tasks',JSON.stringify(tasks))

    })
    const taskText = document.createElement('p')
    taskText.textContent = task.text

    const deleteBtn = document.createElement('span')
    deleteBtn.classList.add('delete')
    deleteBtn.textContent = '🗑'
    deleteBtn.addEventListener('click', e => {
        li.remove()
        // remove from local storage
        tasks.splice(tasks.indexOf(task), 1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    })

    li.append(checkboxbtn, taskText, deleteBtn)
    ul.append(li)
}

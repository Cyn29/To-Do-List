

async function createTask () {
    let result = await fetch('http://localhost:3000/tasks')
    let data = await result.json()
    return data
}

async function getTasks() {

}

async function updateTask() {

}

async function deleteTask () {

}

async function printTasks() {
    let tasks = await getTasks()
}
async function addTask() {
    let result = await fetch("http://localhost:3000/tasks")
    let data = await result.json()
    console.log(result)
}
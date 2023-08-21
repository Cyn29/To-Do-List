const addTaskIcon = document.getElementById("add-img");
const textTitle = document.getElementById("input-title");
const textDescription = document.getElementById("input-description");
const taskList = document.getElementById("task-list");

async function showTasksInScreen() {
    let result = await fetch(" http://localhost:3000/tasks");
    let data = await result.json();
    data.forEach((task) => {
        let taskItem = document.createElement("li");
        taskItem.classList.add("task-item")
        if(task.completed === true) {
            taskItem.innerHTML = `<input type="checkbox" onclick="postCheckedTask(${task})" checked id=${task.id}> <strong>${task.title}</strong> ${task.description} <img src="../assets/edit.png" onclick="editTask(${task.id})" id=${task.id}/> <img src="../assets/garbage.png" onclick="deleteTask(${task.id})" id=${task.id}</>`;
        }else{
            taskItem.innerHTML = `<input type="checkbox" onclick="postCheckedTask(${task})" id=${task.id}> <strong>${task.title}</strong> ${task.description} <img src="../assets/edit.png" onclick="editTask(${task.id})" id=${task.id}/> <img src="../assets/garbage.png" onclick="deleteTask(${task.id})" id=${task.id}</>`;
        }
        taskList.appendChild(taskItem);
    });
}

showTasksInScreen();

let postCheckedTask = async (task) => {
    console.log(task)
    /*let result = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...task,
                completed: true
            }),
        });
        let data = await result.json();
        console.log(data);*/
    }

let showAddedTasks = addTaskIcon.addEventListener("click", async () => {
    let inputTitle = textTitle.value;
    let inputDescription = textDescription.value;
    if (inputTitle !== "" && inputDescription !== "") {
        let result = await fetch(" http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: inputTitle,
                description: inputDescription,
            }),
        });
        let data = await result.json();
        console.log(data);
    } else {
        Swal.fire({
            title: '¡Introduce una tarea!',
            imageUrl: '../assets/meme-patrick-star.gif',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Gif image in sweet alert',
          })
    }
});

async function editTask(id) {
    let result = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
    });
    let data = await result.json();
}

async function deleteTask(id) {
    let result = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
    });
    let data = await result.json();
}

const addTaskIcon = document.getElementById("add-img")
const textTitle = document.getElementById("input-title")
const textDescription = document.getElementById("input-description")
const inputId = document.getElementById("input-id")
const taskList = document.getElementById("task-list")

async function showTasksInScreen() {
    let result = await fetch("http://localhost:3000/tasks");
    let data = await result.json();
    data.forEach((task) => {
        let taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        let checkedAttribute = task.completed ? "checked" : "";
        taskItem.innerHTML = `<input type="checkbox" onclick="postCheckedTask(${task.id}, this)" ${checkedAttribute} id="${task.id}"> <strong>${task.title}</strong> ${task.description} <img src="../../src/assets/edit.png" class="edit-image" onclick="editTask(${task.id})" id="${task.id}"/> <img src="../../src/assets/garbage.png" class="delete-image" onclick="deleteTask(${task.id})" id="${task.id}"/>`;

        taskList.appendChild(taskItem);
    });
}

showTasksInScreen();

let showAddedTasks = addTaskIcon.addEventListener("click", async () => {
    let inputTitle = textTitle.value;
    let inputDescription = textDescription.value;
    const date = new Date();
    const textDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    if (inputTitle && inputDescription !== "") {
        let result = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: inputTitle,
                description: inputDescription,
                createdAt: textDate,
                completed: false, 
            }),
        });
        
        let data = await result.json(); 
        let taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `<input type="checkbox" onclick="postCheckedTask(${data.id}, this)" id="${data.id}"> <strong>${data.title}</strong> ${data.description} <img src="../assets/edit.png" class="edit-image" onclick="editTask(${data.id})" id="${data.id}"/> <img src="../assets/garbage.png" class="delete-image" onclick="deleteTask(${data.id})" id="${data.id}"/>`;
        taskList.appendChild(taskItem);
    } else {
        Swal.fire({
            title: 'Complete your task!',
            imageUrl: '../../src/assets/meme-patrick-star.gif',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Gif image in sweet alert',
        });
    }
});

async function postCheckedTask(id, checkbox) {
    let completed = checkbox.checked;
    let result = await fetch(`http://localhost:3000/tasks/${id}`);
    let task = await result.json();

    task.completed = completed;

    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
}

async function editTask(id) {
    localStorage.setItem("editId", id);
    window.location.href="../edit.html"
}

async function deleteTask(id) {
    Swal.fire({
        title: 'Task will be deleted. Are you sure?',
        showDenyButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't delete`,
      }).then((result) => {
        if (result.isConfirmed) {
          let result = fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
        });
        let data = result.json();
        } else if (result.isDenied) {
          Swal.fire('Task has not been deleted', '', 'info')
        }
      })
}

const edit = localStorage.getItem("editId")
const editTitle = document.getElementById("edit-title")
const editDescription = document.getElementById("edit-description")
const title = document.getElementById("title")
const savebtn = document.getElementById("save-button")

title.textContent = edit

savebtn.addEventListener("click", saveData) 

async function saveData () {
    const titleValue = editTitle.value
    const descriptionValue = editDescription.value
    if (titleValue && descriptionValue !== "") {
        await fetch(`http://localhost:3000/tasks/${edit}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: titleValue,
                description: descriptionValue,
            }),
        });
        window.location.href="../../index.html"
    }
}

let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");

// The Array Of Data
let arrayOfData = [];

// checke LocalStorage Data
if (localStorage.getItem("tasks")) {
  arrayOfData = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger
getDataFromLocalStorage();

// Get input Value and Reset Inout
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // add task to array
    input.value = ""; // empty the input
  }
};

// Add Tasks To ArrayOfData
function addTaskToArray(inputValue) {
  const tasks = {
    id: Date.now(),
    title: inputValue,
    completed: false,
  };
  arrayOfData.push(tasks);
  addTasksToPage(arrayOfData);
  addTasksToLocalStorage(arrayOfData);
}

// Add Tasks To Page
function addTasksToPage(data) {
  taskDiv.innerHTML = "";
  data.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let delet = document.createElement("span");
    delet.className = "del";
    delet.appendChild(document.createTextNode("Delete"));
    div.appendChild(delet);
    taskDiv.appendChild(div);
  });
}

// Add Tasks To localStorage
function addTasksToLocalStorage(data) {
  window.localStorage.setItem("tasks", JSON.stringify(data));
}

// Get Data From LocalStorage
function getDataFromLocalStorage() {
  let storageData = localStorage.getItem("tasks");
  if (storageData) {
    let tasks = JSON.parse(storageData);
    addTasksToPage(tasks);
  }
}

// Delete Button
taskDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // Remove Tasks From LocalStorage
    deletTasksFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    // Remove Tasks From Page
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    // Toggle Compelete
    toggleTask(e.target.getAttribute("data-id"));
    // Add Done Class
    e.target.classList.toggle("done");
  }
});

// Update LocalStorage Data After Delete Task
function deletTasksFromLocalStorage(id) {
  let newArray = arrayOfData.filter((task) => task.id != id);
  addTasksToLocalStorage(newArray);
}

function toggleTask(id) {
  for (let i = 0; i < arrayOfData.length; i++) {
    if (arrayOfData[i].id == id) {
      arrayOfData[i].completed == false
        ? (arrayOfData[i].completed = true)
        : (arrayOfData[i].completed = false);
    }
  }
  addTasksToLocalStorage(arrayOfData);
}

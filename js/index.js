import { ToDo } from "../models/toDo.js";
import { ToDoService } from "../models/toDoService.js";
class toDoList extends ToDo {}
const toDoService = new ToDoService();

// getElement
const getElement = (id) => {
  return document.getElementById(id);
};
// function toDoFalse
const toDoFalse = () => {
  return toDoService.toDoList.filter((val) => val.status === false);
};

// function toDoComplete
const toDoComplete = () => {
  return toDoService.toDoList.filter((val) => val.status === true);
};

// Render ToDoList
const renderToDoList = (arr) => {
  const valueString = arr.reduce((htmlString, val) => {
    return (htmlString += `
        <li>
            <p>${val.name}</p>
            <span class="buttons">
                <button onclick="remove('${val.id}')">
                <i class="fas fa-trash-alt remove"></i>
                </button>
                <button onclick="complete('${val.id}')">
                <i class="fas fa-check-circle complete"></i>
                </button>
            </span>
        </li>`);
  }, "");
  getElement("todo").innerHTML = valueString;
};

// Render ToDoComplete
const renderToDoComplete = (arr) => {
  const valueString = arr.reduce((htmlString, val) => {
    return (htmlString += `
        <li>
            <span>${val.name}</span>
            <span class="buttons">
                <button onclick="remove('${val.id}')">
                    <i class="fas fa-trash-alt remove"></i>
                </button>
                <button onclick="complete('${val.id}')" class="complete">
                    <i class="fas fa-check-circle complete"></i>
                </button>
            </span>
        </li>
           `);
  }, "");
  getElement("completed").innerHTML = valueString;
};

// Set LocalStorage
const setLocalStorage = () => {
  localStorage.setItem("toDoList", JSON.stringify(toDoService.toDoList));
};

// Get LocalStorage
const getLocalStorage = () => {
  if (localStorage.getItem("toDoList")) {
    const arrTodo = localStorage.getItem("toDoList");
    toDoService.toDoList = JSON.parse(arrTodo);
    const toNotWork = toDoFalse();
    renderToDoList(toNotWork);
    const toWork = toDoComplete();
    renderToDoComplete(toWork);
  }
};
getLocalStorage();

// Button add
getElement("addItem").onclick = () => {
  const inputWork = getElement("newTask").value;

  if (inputWork.trim() !== "") {
    const toDo = new toDoList(Date.now(), inputWork, false);
    toDoService.addToDo(toDo);
  }
  setLocalStorage();
  const toDoFalse = toDoService.toDoList.filter((val) => {
    if (val.status === false) {
      return true;
    }
  });
  console.log(toDoFalse);
  renderToDoList(toDoFalse);
  setLocalStorage();
};

// button remove
window.remove = (id) => {
  const idClick = Number(id);
  toDoService.removeToDo(idClick);
  const toDoWork = toDoComplete();
  const toDoNotWork = toDoFalse();
  renderToDoComplete(toDoWork);
  renderToDoList(toDoNotWork);
  setLocalStorage();
};

// button complete
window.complete = (id) => {
  const idClick = Number(id);
  toDoService.toDoList.forEach((val) => {
    if (val.id === idClick) {
      val.status = true;
      setLocalStorage();
    }
  });
  const toDoWork = toDoComplete();
  const toDoNotWork = toDoFalse();
  renderToDoComplete(toDoWork);
  renderToDoList(toDoNotWork);
};

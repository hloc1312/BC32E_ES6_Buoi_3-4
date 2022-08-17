export class ToDoService {
  constructor() {}
  toDoList = [];
  addToDo(toDo) {
    this.toDoList = [...this.toDoList, toDo];
  }
  removeToDo(id) {
    this.toDoList = this.toDoList.filter((val) => val.id !== id);
  }
}

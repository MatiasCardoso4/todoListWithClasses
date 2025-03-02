const input = document.querySelector(".todo-input");
const form = document.querySelector("form");
const addBtn = document.querySelector(".add-todo-btn");
const todosContainer = document.querySelector(".todo-list");

class Todo {
  constructor(inputValue) {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    this.todo = inputValue;
  }

  addTodos() {
    const exists = this.todos.some((t) => t.name === this.todo);
    if (!exists) {
      this.todos.push({ name: this.todo });
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
  
  }

  deleteTodo(todo) {
    this.todos = this.todos.filter((t) => t.name !== todo.name);
    localStorage.setItem("todos", JSON.stringify(this.todos));
    display.setDisplay();
  }
}

class Display {
  constructor(todos) {
    this.todos = todos;
  }

  setDisplay() {
    this.todos.forEach((todo) => {
      this.createTodoItem(todo);
    });
  }

  createTodoItem(todo) {
    const { buttons, modifyTodoBtn, taskCompletedBtn, deleteTaskBtn } = this.createButton();
    const item = document.createElement("li");
    const text = document.createElement("p");
    const deleteTodo = new Todo();
    item.classList.add("current");
    modifyTodoBtn.addEventListener("click", () => {
      newTodo.todo = inputValue;
    });

    taskCompletedBtn.addEventListener("click", () => {
      item.classList.remove("current");
      item.classList.remove("urgent");
      item.classList.toggle("completed");
    });

    deleteTaskBtn.addEventListener("click", () => deleteTodo.deleteTodo);

    text.textContent = todo.name;
    
    item.append(text, buttons);
    todosContainer.append(item)
    return item;
  }

  createButton() {
    const taskCompletedBtn = document.createElement("button");
    const deleteTaskBtn = document.createElement("button");
    const modifyTodoBtn = document.createElement("button");
    taskCompletedBtn.classList.add("complete");
    deleteTaskBtn.classList.add("delete");
    modifyTodoBtn.classList.add("modify");
    const buttons = document.createElement("div");
    buttons.classList.add("listBtn");

    const checkIcon = document.createElement("img");
    const deleteIcon = document.createElement("img");
    checkIcon.src = "./assets/check.png";
    deleteIcon.src = "./assets/trashcanicon.png";
    modifyTodoBtn.textContent = "modify";
    taskCompletedBtn.appendChild(checkIcon);
    deleteTaskBtn.appendChild(deleteIcon);
    buttons.append(modifyTodoBtn, taskCompletedBtn, deleteTaskBtn);
    return {
      buttons,
      taskCompletedBtn,
      deleteTaskBtn,
      modifyTodoBtn,
    };
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  newTodo.addTodos();
});

input.addEventListener("input", (e) => {
  let inputValue = e.target.value;
  newTodo = new Todo(inputValue);
});

let newTodo = new Todo();
const display = new Display(newTodo.todos);

document.addEventListener('DOMContentLoaded',()=>  display.setDisplay())

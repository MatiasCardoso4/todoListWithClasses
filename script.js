const input = document.querySelector(".todo-input");
const form = document.querySelector("form");
const addBtn = document.querySelector(".add-todo-btn");
const todosContainer = document.querySelector(".todo-list");

let inputValue = undefined;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (newTodo.todos.includes(inputValue)) return;
  newTodo.addTodos();
  display.setDisplay(newTodo.todos);
});

class Todo {
  constructor() {
    this.todos = [];
    this.todo = undefined;
  }

  getTodo(inputValue) {
    this.todo = inputValue;
  }

  addTodos() {
    this.todos.push(this.todo);
  }
}

input.addEventListener("input", (e) => {
  inputValue = e.target.value;
  newTodo.getTodo(inputValue);
});

class Display {
  setDisplay(todos) {
    const item = this.createTodoItem(todos);
    todosContainer.append(item);
  }

  createTodoItem(todos) {
    const {buttons, taskCompletedBtn,priorityTaskdBtn} = this.createButton();
    const item = document.createElement("li");
    const text = document.createElement('p')
    item.classList.add("current");

    taskCompletedBtn.addEventListener('click', ()=>{
      item.classList.remove('current')
      item.classList.remove('urgent')
      item.classList.toggle('completed')

    })

    priorityTaskdBtn.addEventListener('click', ()=>{
      item.classList.remove('current')
      item.classList.remove('completed')
      item.classList.add('urgent')
    })
    todos.map((todo) => {
      text.textContent = todo
      item.append(text, buttons);
    });
    return item;
  }

  createButton() {
    const buttons = document.createElement("div");
    buttons.classList.add('listBtn')
    const taskCompletedBtn = document.createElement("button");
    const priorityTaskdBtn = document.createElement("button");

    taskCompletedBtn.innerText = "task complete";
    priorityTaskdBtn.innerText = "high priority";
    buttons.append(taskCompletedBtn, priorityTaskdBtn);
    return {
      buttons,
      taskCompletedBtn,
      priorityTaskdBtn,
    };
  }
}
const newTodo = new Todo();
const display = new Display();

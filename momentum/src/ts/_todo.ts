const todo = (<HTMLElement> document.querySelector('.todo'));
const todoButton = document.querySelector('.todo-button');

let displayTodo = false;


function showTodo() {

  if (displayTodo === false) {
    todo.style.visibility = 'visible';
    todo.style.opacity = '1';
    displayTodo = true;
  } else {
    todo.style.opacity = '0';
    todo.style.visibility = 'hidden';
    displayTodo = false;
  }

}
todoButton?.addEventListener('click', showTodo);



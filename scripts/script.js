'use strict';

const todoControl = document.querySelector('.todo-control'),
	headerInput = document.querySelector('.header-input'),
	todoList = document.querySelector('.todo-list'),
	todoCompleted = document.querySelector('.todo-completed');

let todoData = JSON.parse(localStorage.getItem('Данные о делах'));

const render = function () {
	todoList.textContent = '';
	todoCompleted.textContent = '';

	if (todoData !== null) {
		todoData.forEach(function (item, i) {
			const li = document.createElement('li');
			li.classList.add('todo-item');

			li.innerHTML = `<span class="text-todo">${item.value}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>`;

			if (item.completed) {
				todoCompleted.append(li);
			} else {
				todoList.append(li);
			}

			const btnTodoComplete = li.querySelector('.todo-complete');
			btnTodoComplete.addEventListener('click', function () {
				item.completed = !item.completed;
				render();
			});

			const btnTodoRemove = li.querySelector('.todo-remove');
			btnTodoRemove.addEventListener('click', function () {
				todoData.splice(i, 1);
				render();
			});
		});
	} else {
		todoData = [];
	}


	let todoDataJSON = JSON.stringify(todoData);
	localStorage.setItem('Данные о делах', todoDataJSON);
};

todoControl.addEventListener('submit', function (e) {
	e.preventDefault();

	const newTodo = {
		value: headerInput.value,
		completed: false
	};

	if (headerInput.value === '') {
		headerInput.style.border = '1px solid red';
	} else {
		todoData.push(newTodo);
		headerInput.style.border = '0';
		render();
	}
	headerInput.value = '';
});

render();
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const countSpan = document.getElementById('count');
const clearCompleted = document.getElementById('clearCompleted');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  render();
}

function createTaskElement(task, index) {
  const li = document.createElement('li');
  li.className = 'task-item' + (task.completed ? ' completed' : '');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => {
    tasks[index].completed = checkbox.checked;
    save();
  });

  const label = document.createElement('span');
  label.className = 'label';
  label.textContent = task.text;

  const delBtn = document.createElement('button');
  delBtn.className = 'delete-btn';
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', () => {
    tasks.splice(index, 1);
    save();
  });

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(delBtn);

  return li;
}

function render() {
  taskList.innerHTML = '';
  tasks.forEach((t, i) => {
    taskList.appendChild(createTaskElement(t, i));
  });
  countSpan.textContent = tasks.length + (tasks.length === 1 ? ' task' : ' tasks');
}

addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ text, completed: false });
  taskInput.value = '';
  save();
});

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTaskBtn.click();
});

clearCompleted.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.completed);
  save();
});

// initial render
render();

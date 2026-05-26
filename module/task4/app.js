class Task {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.done = false;
  }
 
  toggle() {
    this.done = !this.done;
  }
}
 
/* ----- Клас TodoList ----- */
class TodoList {
  constructor() {
    this.tasks = [];
    this.nextId = 1; // унікальний інкрементний id
  }
 
  add(text) {
    const trimmed = String(text || '').trim();
    if (!trimmed) return null; // не додаємо порожні завдання
 
    const task = new Task(this.nextId++, trimmed);
    this.tasks.push(task);
    return task;
  }
 
  remove(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
 
  getActive() {
    return this.tasks.filter(t => !t.done);
  }
 
  findById(id) {
    return this.tasks.find(t => t.id === id);
  }
}
 
/* ----- Підключення до DOM ----- */
const todoList = new TodoList();
 
const input   = document.getElementById('taskInput');
const addBtn  = document.getElementById('addBtn');
const listEl  = document.getElementById('taskList');
 
function render() {
  listEl.innerHTML = '';
  for (const task of todoList.tasks) {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.dataset.id = task.id;          // зберігаємо id для делегування
    if (task.done) li.classList.add('done');
    listEl.appendChild(li);
  }
}
 
// Додавання завдання
addBtn.addEventListener('click', () => {
  const task = todoList.add(input.value);
  if (task) {
    input.value = '';
    render();
  }
});
 
// Enter в полі вводу теж додає
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') addBtn.click();
});
 
// Делегування подій: один обробник на <ul>, ловить кліки по <li>
listEl.addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;
 
  const id = Number(li.dataset.id);
  const task = todoList.findById(id);
  if (task) {
    task.toggle();
    render();
  }
});

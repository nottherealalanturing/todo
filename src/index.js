import './style.css';
import { clearCompleted } from './modules/status.js';
import { addItem, populateDOM } from './modules/utils.js';
const form = document.querySelector('.form');
const newItem = document.querySelector('.newItem');
const refresh = document.querySelector('.fa-arrows-rotate');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addItem(newItem.value);
  newItem.value = '';
});

refresh.addEventListener('click', () => {
  populateDOM();
});

window.addEventListener('storage', () => {
  console.log(JSON.parse(window.localStorage.getItem('tasks')));
  populateDOM();
});

populateDOM();

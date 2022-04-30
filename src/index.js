import './style.css';
import Tasks from './modules/Tasks.js';
import { clearCompleted } from './modules/status.js';
import { addItem, populateDOM } from './modules/utils';

const form = document.querySelector('.form');
const newItem = document.querySelector('.newItem');
const clearCompletedBtn = document.querySelector('.clearBtn');
const refresh = document.querySelector('.fa-arrows-rotate');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addItem(newItem.value);
  newItem.value = '';
  populateDOM();
});

clearCompletedBtn.addEventListener('click', () => {
  clearCompleted();
  populateDOM();
});

refresh.addEventListener('click', () => {
  populateDOM();
});

populateDOM();

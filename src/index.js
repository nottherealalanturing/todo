import './style.css';
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
  populateDOM();
});

populateDOM();

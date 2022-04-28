import './style.css';
import Tasks from './Tasks';

const MyTasks = new Tasks();

const addInput = document.querySelector('.newItem');

addInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    MyTasks.addTask(e.target.value, false);
  }
});

const populateDOM = () => {
  const tasksList = document.querySelector('#tasks');
  let newList = '';
  MyTasks.tasks.forEach((val, i) => {
    newList += `<li class="task bb">
    <div class="task-div" data-index=${MyTasks.tasks[i].index}>
      <input type="checkbox" id="completed" data=${MyTasks.tasks[i].completed}/>
      <p>${MyTasks.tasks[i].description}</p>
    </div>
    <i class="fa-solid fa-ellipsis-vertical"></i>
  </li>`;
  });
  tasksList.innerHTML = newList;
};

populateDOM();

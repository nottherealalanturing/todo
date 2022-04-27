import './style.css';

const tasks = [
  { description: 'Wash the dishes.', completed: false, index: 0 },
  { description: 'Bake some cake.', completed: false, index: 1 },
  { description: 'Fix doors.', completed: false, index: 2 },
];

const populateDOM = () => {
  const tasksList = document.querySelector('#tasks');
  let newList = '';
  tasks.forEach((val, i) => {
    newList += `<li class="task bb">
    <div class="task-div" data-index=${tasks[i].index}>
      <input type="checkbox" id="completed" data=${tasks[i].completed}/>
      <p>${tasks[i].description}</p>
    </div>
    <i class="fa-solid fa-ellipsis-vertical"></i>
  </li>`;
  });
  tasksList.innerHTML = newList;
};

populateDOM();

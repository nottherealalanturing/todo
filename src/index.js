import './style.css';

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

import './style.css';
import Tasks from './Tasks.js';

const MyTasks = new Tasks();

const addInput = document.querySelector('.newItem');

const editAction = () => {
  document.querySelectorAll('.task').forEach((val) => {
    val.children[0].children[1].addEventListener('blur', (e) => {
      /* eslint-disable */
      MyTasks.editTask(
        parseInt(e.target.dataset.index, 10),
        e.target.textContent
      );
      /* eslint-enable */
      localStorage.setItem('tasks', JSON.stringify(MyTasks.tasks));
    });
  });
};

const alternateIcons = () => {
  document.querySelectorAll('.task').forEach((val) => {
    val.firstChild.addEventListener('click', (e) => {
      e.target.parentElement.classList.toggle('selected');
      if (e.target.parentElement.classList.contains('selected')) {
        val.removeChild(val.lastChild);
        /* eslint-disable */
        val.appendChild(
          new DOMParser().parseFromString(
            `<i class="fa fa-trash" data-icon-index=${val.dataset.index} aria-hidden="true"></i>`,
            'text/html'
          ).body.childNodes[0]
        );
        /* eslint-enable */
        val.lastChild.addEventListener('click', (e) => {
          const parent = e.target.parentElement.parentElement;
          parent.removeChild(e.target.parentElement);
          MyTasks.deleteTask(parseInt(e.target.dataset.iconIndex, 10));
          localStorage.setItem('tasks', JSON.stringify(MyTasks.tasks));
          console.log(MyTasks.tasks);
        });
      } else {
        val.removeChild(val.lastChild);
        /* eslint-disable */
        val.appendChild(
          new DOMParser().parseFromString(
            `<i class="fa-solid data-icon-index=${val.dataset.index} fa-ellipsis-vertical"></i>`,
            'text/html'
          ).body.childNodes[0]
          /* eslint-enable */
        );
      }
    });
  });
};

const populateDOM = () => {
  const tasksList = document.querySelector('#tasks');
  let newList = '';

  MyTasks.tasks.forEach((val) => {
    newList += `<li class="task bb" data-index=${val.index}><div class="task-div" data-index=${val.index}><input type="checkbox" id="completed" data-index=${val.index} data=${val.completed}/><p class='description' data-index=${val.index} contenteditable="true">${val.description}</p></div><i class="fa-solid fa-ellipsis-vertical" data-icon-index=${val.index}></i></li>`;
  });

  tasksList.innerHTML = newList;

  alternateIcons();
  editAction();
};

addInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    MyTasks.addTask(e.target.value, false);
    localStorage.setItem('tasks', JSON.stringify(MyTasks.tasks));
    document.querySelector('.newItem').value = '';
  }
  populateDOM();
});

populateDOM();

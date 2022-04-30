import './style.css';
import Tasks from './modules/Tasks.js';
import { clearCompleted, updateStatus } from './modules/status.js';

const MyTasks = new Tasks();

const form = document.querySelector('.form');
const newItem = document.querySelector('.newItem');
const clearCompletedBtn = document.querySelector('.clearBtn');
const refresh = document.querySelector('.fa-arrows-rotate');

const editAction = () => {
  document.querySelectorAll('.task').forEach((val) => {
    val.children[1].children[0].addEventListener('blur', (e) => {
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

const selectTask = (item) => {
  document.querySelectorAll('.task').forEach((e) => {
    e.addEventListener('click', (e) => {
      const selectedTask = document.querySelector(
        `[data-index="${e.originalTarget.dataset.index}"`
      );

      document.querySelectorAll('.task').forEach((e) => {
        e.classList.remove('selected');
        e.removeChild(e.lastChild);
        /* eslint-disable */
        e.appendChild(
          new DOMParser().parseFromString(
            `<i class="fa-solid data-icon-index=${e.dataset.index} fa-ellipsis-vertical"></i>`,
            'text/html'
          ).body.childNodes[0]
          /* eslint-enable */
        );
      });

      selectedTask.classList.add('selected');

      selectedTask.removeChild(selectedTask.lastChild);

      /* eslint-disable */
      selectedTask.appendChild(
        new DOMParser().parseFromString(
          `<i class="fa fa-trash" data-icon-index=${selectedTask.dataset.index} aria-hidden="true"></i>`,
          'text/html'
        ).body.childNodes[0]
      );
      /* eslint-enable */

      selectedTask.lastChild.addEventListener('click', (e) => {
        MyTasks.deleteTask(parseInt(e.target.dataset.iconIndex, 10));
        populateDOM();
      });
    });
  });
};

const populateDOM = () => {
  const tasksList = document.querySelector('#tasks');
  let newList = '';

  MyTasks.displayTasks().forEach((val) => {
    newList += `<li class="task bb" data-index=${
      val.index
    }><input type="checkbox" id="completed" data-index=${val.index} ${
      val.completed === 'true' ? 'checked' : null
    } data-completed=${val.completed}/><div class="task-div" data-index=${
      val.index
    }><p class='description' data-index=${val.index} contenteditable="true">${
      val.description
    }</p></div><i class="fa-solid fa-ellipsis-vertical" data-icon-index=${
      val.index
    }></i></li>`;
  });

  tasksList.innerHTML = newList;

  selectTask();
  editAction();
  updateStatus(MyTasks);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  MyTasks.addTask(newItem.value, false);
  newItem.value = '';
  populateDOM();
});

clearCompletedBtn.addEventListener('click', () => {
  clearCompleted(MyTasks);
  populateDOM();
});

refresh.addEventListener('click', () => {
  populateDOM();
});

populateDOM();

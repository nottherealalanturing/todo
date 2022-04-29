import './style.css';
import Tasks from './modules/Tasks.js';
import { clearTasks, updateStatus } from './modules/status.js';

const MyTasks = new Tasks();

const addInput = document.querySelector('.newItem');
const clearBtn = document.querySelector('.clearBtn');

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

const alternateIcons = () => {
  document.querySelectorAll('.task').forEach((val) => {
    val.children[1].addEventListener('click', (e) => {
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

  MyTasks.displayTasks().forEach((val) => {
    newList += `<li class="task bb" data-index=${val.index}><input type="checkbox" id="completed" data-index=${val.index} data-completed=${val.completed}/><div class="task-div" data-index=${val.index}><p class='description' data-index=${val.index} contenteditable="true">${val.description}</p></div><i class="fa-solid fa-ellipsis-vertical" data-icon-index=${val.index}></i></li>`;
  });

  tasksList.innerHTML = newList;

  alternateIcons();
  editAction();
  updateStatus(MyTasks.tasks);
};

addInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    MyTasks.addTask(e.target.value, false);
    localStorage.setItem('tasks', JSON.stringify(MyTasks.tasks));
    document.querySelector('.newItem').value = '';
  }
  populateDOM();
});

clearBtn.addEventListener('click', (e) => {
  clearTasks(MyTasks.tasks);
  MyTasks.index = 0;
  populateDOM();
});

refresh.addEventListener('click', () => {
  populateDOM();
});

populateDOM();

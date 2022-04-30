import './style.css';
import Tasks from './modules/Tasks.js';
import { clearCompleted, updateStatus } from './modules/status.js';

const MyTasks = new Tasks();

const addInput = document.querySelector('.newItem');
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

  alternateIcons();
  editAction();
  updateStatus(MyTasks.tasks);
};

addInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    MyTasks.addTask(e.target.value, false);
    document.querySelector('.newItem').value = '';
  }
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

import { updateStatus } from './status.js';
import Tasks from './Tasks.js';

const MyTasks = new Tasks();

const selectTask = () => {
  document.querySelectorAll('.task').forEach((e) => {
    e.addEventListener('click', (e) => {
      /* eslint-disable */

      /* Get source of event */
      const selectedTask = document.querySelector(
        `[data-index="${e.originalTarget.dataset.index}"`
      );

      /* Remove highlight from all tasks */
      document.querySelectorAll('.task').forEach((e) => {
        e.classList.remove('selected');
        e.removeChild(e.lastChild);
        e.appendChild(
          new DOMParser().parseFromString(
            `<i class="fa-solid data-icon-index=${e.dataset.index} fa-ellipsis-vertical"></i>`,
            'text/html'
          ).body.childNodes[0]
          /* eslint-enable */
        );
      });

      /* Add highlight to selected task */
      selectedTask.classList.add('selected');

      /* show delete icon */
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
        /* eslint-disable-next-line */
        populateDOM();
      });
    });
  });
};

const editAction = () => {
  document.querySelectorAll('.task').forEach((val) => {
    val.children[1].children[0].addEventListener('blur', (e) => {
      /* eslint-disable */
      MyTasks.editTask(
        parseInt(e.target.dataset.index, 10),
        e.target.textContent
      );
      /* eslint-enable */
    });
  });
};

export const populateDOM = () => {
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

  selectTask(MyTasks);
  editAction();
  updateStatus(MyTasks);
};

export const addItem = (description) => {
  MyTasks.addTask(description, false);
};

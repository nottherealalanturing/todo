import { populateDOM } from './utils';

let dragStartIndex;

export const dragListeners = (tasklist) => {
  const draggables = document.querySelectorAll('.task');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', (e) => {
      dragStart(e);
    });
    draggable.addEventListener('drop', (e) => {
      dragDrop(e, tasklist);
    });
    draggable.addEventListener('dragover', dragOver);
  });
};

const dragStart = (e) => {
  dragStartIndex = e.originalTarget.dataset.index;
};

const dragDrop = (e, tasklist) => {
  const dragDropIndex = e.originalTarget.dataset.index;
  swapTask(dragStartIndex, dragDropIndex, tasklist);
};

const dragOver = (e) => {
  e.preventDefault();
};

const swapTask = (taskA, taskB, tasklist) => {
  const tempA = tasklist.tasks[taskA - 1];
  const tempB = tasklist.tasks[taskB - 1];
  tasklist.tasks[taskA - 1] = tempB;
  tasklist.tasks[taskB - 1] = tempA;
  console.log(tasklist.tasks);
  localStorage.setItem('tasks', JSON.stringify(tasklist.tasks));
  populateDOM();
};

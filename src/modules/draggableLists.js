import { storageEvent } from './Tasks';

let dragStartIndex;

const swapTask = (taskA, taskB, tasklist) => {
  const tempA = tasklist.tasks[taskA - 1];
  const tempB = tasklist.tasks[taskB - 1];
  tasklist.tasks[taskA - 1] = tempB;
  tasklist.tasks[taskB - 1] = tempA;
  tasklist.tasks.forEach((val, i) => {
    val.index = i + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(tasklist.tasks));
};

const dragStart = (e) => {
  dragStartIndex = e.originalTarget.dataset.index;
};

const dragDrop = (e, tasklist) => {
  const dragDropIndex = e.originalTarget.dataset.index;
  swapTask(dragStartIndex, dragDropIndex, tasklist);
  window.dispatchEvent(storageEvent);
};

const dragOver = (e) => {
  e.preventDefault();
};

const dragListeners = (tasklist) => {
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

export default dragListeners;

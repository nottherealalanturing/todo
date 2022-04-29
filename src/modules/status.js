import Tasks from './Tasks.js';

export const updateStatus = (tasklist) => {
  document.querySelectorAll('.task').forEach((val) => {
    val.children[0].addEventListener('change', (e) => {
      /* eslint-disable */
      Tasks.updateTaskStatus(
        e.target.dataset.index,
        e.target.checked,
        tasklist
      );
      /* eslint-enable */
    });
  });
};

export const clearCompleted = (tasklist) => {
  Tasks.clearCompletedTasks(tasklist);
};

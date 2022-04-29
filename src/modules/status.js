import Tasks from './Tasks.js';

export const updateStatus = (tasklist) => {
  document.querySelectorAll('.task').forEach((val) => {
    val.children[0].addEventListener('change', (e) => {
      Tasks.updateTaskStatus(
        e.target.dataset.index,
        e.target.checked,
        tasklist
      );
    });
  });
};

export const clearTasks = () => {
  Tasks.clearAllTasks();
};

export const clearCompleted = (tasklist) => {
  Tasks.clearCompletedTasks(tasklist);
};

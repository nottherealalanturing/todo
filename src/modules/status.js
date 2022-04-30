export const updateStatus = (tasks) => {
  document.querySelectorAll('.task').forEach((val) => {
    val.children[0].addEventListener('change', (e) => {
      /* eslint-disable */
      tasks.updateTaskStatus(e.target.dataset.index, e.target.checked);
      /* eslint-enable */
    });
  });
};

export const clearCompleted = (task) => {
  task.clearCompletedTasks();
};

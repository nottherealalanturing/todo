const updateStatus = (tasks) => {
  document.querySelectorAll('.task').forEach((val) => {
    val.children[0].addEventListener('change', (e) => {
      tasks.updateTaskStatus(e.target.dataset.index, e.target.checked);
    });
  });
};

export default updateStatus;

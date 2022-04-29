export default class Tasks {
  index = 0;

  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  addTask = (description, completed) => {
    this.tasks.push({
      description,
      completed,
      index: (this.index += 1),
    });
  };

  deleteTask = (index) => {
    /* Remove Task */
    this.tasks.forEach((val, i) => {
      if (this.tasks[i].index === index) {
        this.tasks.splice(i, 1);
      }
    });

    /* update index count */
    this.index -= 1;
  };

  editTask = (index, description) => {
    this.tasks.forEach((val, i) => {
      if (this.tasks[i].index === index) {
        const temp = { ...this.tasks[i], description };
        this.tasks[i] = temp;
      }
    });
  };

  updateTaskStatus = (index, completed) => {
    this.tasks.forEach((val, i) => {
      if (this.tasks[i].index === index) {
        const temp = { ...this.tasks[i], completed };
        this.tasks[i] = temp;
      }
    });
  };

  clearAllTasks = () => {
    /* Remove Task */
    this.tasks = this.tasks.filter((a) => false);

    /* update index count */
    this.index = 0;
  };
}

export default class Tasks {
  static index = 0;

  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  addTask = (description, completed) => {
    this.tasks.push({
      description,
      completed,
      index: parseInt(Tasks.index, 10),
    });
  };

  deleteTask = (index) => {
    this.tasks.forEach((val, i) => {
      if (this.tasks[i].index === index) {
        this.tasks.splice(i, 1);
      }
      Tasks.index -= 1;
    });
  };

  editTask = (index, description) => {
    this.tasks.forEach((val, i) => {
      if (this.tasks[i].index === index) {
        const temp = { ...this.tasks[i], description };
        this.tasks[i] = temp;
      }
    });
  };
}

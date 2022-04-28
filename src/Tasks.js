export default class Tasks {
  static index = 0;
  constructor() {
    this.tasks = [];
  }

  addTask = (description, completed) => {
    console.log();
    this.tasks.push({
      description: description,
      completed: completed,
      index: Tasks.index++,
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

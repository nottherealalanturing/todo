export default class Tasks {
  index = 0;

  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  addTask = (description, completed) => {
    this.tasks.push({
      description,
      completed: completed.toString(),
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

  static updateTaskStatus = (index, completed, tasklist) => {
    /* console.log(`${index} is now ${completed}`); */

    tasklist.forEach((val, i) => {
      if (val.index == index) {
        const temp = { ...tasklist[i], completed: completed.toString() };
        console.log(tasklist[i]);
        console.log(temp);
        tasklist[i] = temp;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasklist));
  };

  static clearAllTasks = () => {
    this.tasks = this.tasks.filter((a) => false);
    this.index = 0;
  };
}

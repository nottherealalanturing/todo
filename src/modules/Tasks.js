export default class Tasks {
  index = JSON.parse(localStorage.getItem('tasks')).length;

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

  displayTasks = () => {
    if (localStorage.getItem('tasks').length === 0) return [];
    else return JSON.parse(localStorage.getItem('tasks'));
  };

  static updateTaskStatus = (index, completed, tasklist) => {
    tasklist.forEach((val, i) => {
      if (val.index.toString() === index.toString()) {
        const temp = { ...tasklist[i], completed: completed.toString() };
        tasklist[i] = temp;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasklist));
  };

  static clearAllTasks = () => {
    localStorage.setItem('tasks', JSON.stringify([]));
  };

  static clearCompletedTasks = (tasklist) => {
    tasklist = tasklist.filter((val) => val.completed !== 'true');
    localStorage.setItem('tasks', JSON.stringify(tasklist));
    return tasklist.length;
  };
}

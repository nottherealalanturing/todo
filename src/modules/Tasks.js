export default class Tasks {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.index = this.initIndex();
  }

  initIndex = () => {
    if (JSON.parse(localStorage.getItem('index'))) {
      return parseInt(JSON.parse(localStorage.getItem('index')), 10);
    }
    localStorage.setItem('index', JSON.stringify(0));
    return 0;
  };

  addTask = (description, completed) => {
    const newIndex = (this.index += 1);
    this.tasks.push({
      description,
      completed: completed.toString(),
      index: newIndex,
    });
    localStorage.setItem('index', newIndex);
  };

  deleteTask = (index) => {
    const newIndex = (this.index -= 1);
    this.tasks.forEach((val, i) => {
      if (this.tasks[i].index === index) {
        this.tasks.splice(i, 1);
      }
    });

    this.tasks.forEach((val, i) => {
      this.tasks[i].index = i + 1;
    });

    /* update index count */
    this.index = newIndex;
    localStorage.setItem('index', newIndex);
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
    if (this.index === 0) return [];
    return JSON.parse(localStorage.getItem('tasks'));
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

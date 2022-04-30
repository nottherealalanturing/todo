export default class Tasks {
  constructor() {
    this.tasks = this.initTasks();
    this.index = this.initIndex();
  }

  initIndex = () => {
    if (JSON.parse(localStorage.getItem('index'))) {
      return parseInt(JSON.parse(localStorage.getItem('index')), 10);
    }
    localStorage.setItem('index', JSON.stringify(0));
    return 0;
  };

  initTasks = () => {
    if (JSON.parse(localStorage.getItem('tasks'))) {
      return JSON.parse(localStorage.getItem('tasks'));
    }
    return [];
  };

  addTask = (description, completed) => {
    let newIndex = this.index + 1;
    this.tasks.push({
      description,
      completed: completed.toString(),
      index: newIndex,
    });
    localStorage.setItem('index', (this.index += 1));
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };

  deleteTask = (index) => {
    const newIndex = this.index - 1;
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
    return this.tasks;
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

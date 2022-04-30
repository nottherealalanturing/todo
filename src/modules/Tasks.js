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
    const newIndex = this.index + 1;
    this.tasks.push({
      description,
      completed: completed.toString(),
      index: newIndex,
    });
    localStorage.setItem('index', (this.index += 1));
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };

  deleteTask = (index) => {
    this.index -= 1;
    this.tasks.forEach((val, i) => {
      if (this.tasks[i].index === index) {
        this.tasks.splice(i, 1);
      }
    });

    this.tasks.forEach((val, i) => {
      this.tasks[i].index = i + 1;
    });

    localStorage.setItem('index', this.index);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };

  editTask = (index, description) => {
    this.tasks.forEach((val, i) => {
      if (this.tasks[i].index === index) {
        const temp = { ...this.tasks[i], description };
        this.tasks[i] = temp;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };

  displayTasks = () => this.tasks;

  updateTaskStatus = (index, completed) => {
    this.tasks.forEach((val, i) => {
      if (val.index.toString() === index.toString()) {
        const temp = { ...this.tasks[i], completed: completed.toString() };
        this.tasks[i] = temp;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };

  static clearAllTasks = () => {
    localStorage.setItem('tasks', JSON.stringify([]));
  };

  clearCompletedTasks = () => {
    this.tasks = this.tasks.filter((val) => val.completed !== 'true');
    this.index = this.tasks.length;

    this.tasks.forEach((val, i) => {
      this.tasks[i].index = i + 1;
    });

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('index', this.index);
  };
}

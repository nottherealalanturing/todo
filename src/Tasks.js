export default class Tasks {
  static index = 0;
  constructor() {
    this.tasks = [
      { description: 'Wash the dishes.', completed: false, index: 0 },
      { description: 'Bake some cake.', completed: false, index: 1 },
      { description: 'Fix doors.', completed: false, index: 2 },
    ];
  }

  addTask = (description, completed) => {
    this.tasks.push({
      description: description,
      completed: completed,
      index: this.index++,
    });
  };
}

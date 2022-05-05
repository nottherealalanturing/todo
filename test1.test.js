/**
 * @jest-environment jsdom
 */
import ToDoList from './src/modules/to-do-list.js';

describe('ToDoList', () => {
  let toDoList;
  beforeEach(() => {
    toDoList = new ToDoList();
    document.body.innerHTML = '<ul id="to-do-list"></ul>';
    localStorage.clear();
  });

  it('should add a new task to the list', () => {
    toDoList.addToDo('test');
    document.querySelector('#to-do-list').innerHTML = toDoList.renderToDos();
    const list = document.querySelectorAll('#to-do-list .container');
    expect(list)
      .toHaveLength(1);
  });

  it('should remove a task from the list', () => {
    toDoList.addToDo('test');
    toDoList.addToDo('test2');
    toDoList.removeToDo(1);
    document.querySelector('#to-do-list').innerHTML = toDoList.renderToDos();
    const list = document.querySelectorAll('#to-do-list .container');
    expect(list)
      .toHaveLength(1);
  });
});

/**
 * @jest-environment jsdom
 */

import Tasks from './src/modules/Tasks';

describe('ToDoList', () => {
  beforeEach(() => {
    let commonEmitterMock;
    commonEmitterMock = createMock('emit');
    const myTask = new Tasks();
    document.body.innerHTML = '<ul id="tasks" class="mb"></ul>';
    localStorage.clear();
  });

  it('should add a new task to the list', () => {
    myTask.addTask('test');
    const list = document.querySelectorAll('.task');
    expect(list).toHaveLength(1);
  });
});

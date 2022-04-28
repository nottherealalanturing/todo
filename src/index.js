import './style.css';
import Tasks from './Tasks';

const MyTasks = new Tasks();

const addInput = document.querySelector('.newItem');

addInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    MyTasks.addTask(e.target.value, false);
  }
  populateDOM();
});

const deleteAction = () => {
  document.querySelectorAll('.task').forEach((val, index) => {
    val.lastChild.addEventListener('click', (e) => {
      const parent = e.target.parentElement.parentElement;
      parent.removeChild(e.target.parentElement);
      MyTasks.deleteTask(parseInt(e.target.parentElement.dataset.index));
    });
  });
};

const editAction = () => {
  document.querySelectorAll('.task').forEach((val, index) => {
    val.children[0].children[1].addEventListener('blur', (e) => {
      MyTasks.editTask(parseInt(e.target.dataset.index), e.target.textContent);
    });
  });
};

const alternateIcons = () => {
  document.querySelectorAll('.task').forEach((val, index) => {
    val.firstChild.addEventListener('click', (e) => {
      e.target.parentElement.classList.toggle('selected');
      if (e.target.parentElement.classList.contains('selected')) {
        val.removeChild(val.lastChild);
        val.appendChild(
          new DOMParser().parseFromString(
            `<i class="fa fa-trash" data-icon-index=${val.dataset.index} aria-hidden="true"></i>`,
            'text/html'
          ).body.childNodes[0]
        );
        deleteAction();
      } else {
        val.removeChild(val.lastChild);
        val.appendChild(
          new DOMParser().parseFromString(
            `<i class="fa-solid data-icon-index=${val.dataset.index} fa-ellipsis-vertical"></i>`,
            'text/html'
          ).body.childNodes[0]
        );
      }
    });
  });
};

const populateDOM = () => {
  const tasksList = document.querySelector('#tasks');
  let newList = '';

  MyTasks.tasks.forEach((val, i) => {
    newList += `<li class="task bb" data-index=${MyTasks.tasks[i].index}><div class="task-div" data-index=${MyTasks.tasks[i].index}><input type="checkbox" id="completed" data-index=${MyTasks.tasks[i].index} data=${MyTasks.tasks[i].completed}/><p class='description' data-index=${MyTasks.tasks[i].index} contenteditable="true">${MyTasks.tasks[i].description}</p></div><i class="fa-solid fa-ellipsis-vertical" data-icon-index=${MyTasks.tasks[i].index}></i></li>`;
  });

  tasksList.innerHTML = newList;

  alternateIcons();
  editAction();
  console.log(MyTasks.tasks);
};

populateDOM();

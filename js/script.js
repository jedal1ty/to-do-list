{
  let tasks = [
    {
      content: "pokoloruj obrazek",
      done: false,
    },
    {
      content: "uratuj świat",
      done: true,
    },
  ];

  let hideDoneTasks = false;

  const addTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent, done: false}];
    render();
  };

  const deleteTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const setAllTasksAsDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const bindRemoveEvents = () => {
    const deleteButtons = document.querySelectorAll(".js-delete");

    deleteButtons.forEach((deleteButton, taskIndex) => {
      deleteButton.addEventListener("click", () => {
        deleteTask(taskIndex);
      });
    });
  };
  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const renderTasks = () => {
    let taskToHTML = task => `
        <li class="taskList__item ${task.done && hideDoneTasks ? "taskList__item--hidden" : ""} js-tasks">
          <button class="js-done taskList__button taskList__button--finished">
            ${task.done ? "✓" : ""} 
          </button>
          <span class="taskList__content ${task.done ? "taskList__content--finished" : ""}">
            ${task.content}
          </span>
          <button class="js-delete taskList__button taskList__button--delete">🗑️
          </button>
        </li>
      `;

    const tasksElement = document.querySelector(".js-tasks");
    tasksElement.innerHTML = tasks.map(taskToHTML).join("");
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }

    buttonsElement.innerHTML = `
      <button class="buttons__button js-buttons js-toggleHideDoneTasks">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
      </button>
      <button class="buttons__button js-buttons js-setAllTasksAsDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
          Ukończ wszystkie
      </button>
      `;
  };

  const bindButtonsEvents = () => {
    const setAllTasksAsDoneButton = document.querySelector(".js-setAllTasksAsDone");

    if (setAllTasksAsDoneButton) {
      setAllTasksAsDoneButton.addEventListener("click", setAllTasksAsDone);
    }

    const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const render = () => {
    renderTasks();
    bindRemoveEvents();
    bindToggleDoneEvents();
    renderButtons();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-addTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addTask(newTaskContent);
      newTaskElement.value = "";
    }
    newTaskElement.focus();

  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();

}
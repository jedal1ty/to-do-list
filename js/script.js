{
  const tasks = [
    {
      content: "pokoloruj obrazek",
      done: false,
    },
    {
      content: "uratuj świat",
      done: true,
    },
  ];

  const addTask = (newTask) => {
    tasks.push({
      content: newTask,
    });

    render();
  };

  const deleteTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const bindEvents = () => {
    const deleteButtons = document.querySelectorAll(".js-delete");

    deleteButtons.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        deleteTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
          <li
            ${task.done ? " style=\"text-decoration: line-through\"" : ""}
          >
            <button class="js-done">✅</button>
            <button class="js-delete">🗑️</button>
            ${task.content}
          </li>
        `;
    };

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents ();
  };
    const onFormSubmit = (event) => {
    event.preventDefault();


    const newTask = document.querySelector(".js-addTask").value.trim();

    if (newTask === "") {
      return;
    }

    addTask(newTask);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
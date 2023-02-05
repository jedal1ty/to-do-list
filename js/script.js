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

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
          <li
            ${task.done ? " style=\"text-decoration: line-through\"" : ""}
          >
            <button class="js-delete">🗑️</button>
            ${task.content}
          </li>
        `;
    };

    document.querySelector(".js-tasks").innerHTML = htmlString;

    const deleteButtons = document.querySelectorAll(".js-delete");

    deleteButtons.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        deleteTask(index);
      });
    });
  };



  const onFormSubmit = (event) => {
    event.preventDefault();


    const newTask = document.querySelector(".js-addTask").value.trim();

    if (newTask === "") {
      return;
    }

    addTask(newTask);
  }

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
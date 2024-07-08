document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            const taskText = document.createElement('span');
            taskText.textContent = task.text;

            const buttons = document.createElement('div');
            buttons.classList.add('task-buttons');

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit-btn');
            editBtn.addEventListener('click', () => {
                const newText = prompt('Edit task:', task.text);
                if (newText !== null) {
                    task.text = newText;
                    saveTasks();
                    renderTasks();
                }
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            const completeBtn = document.createElement('button');
            completeBtn.textContent = task.completed ? 'Uncomplete' : 'Complete';
            completeBtn.classList.add('complete-btn');
            completeBtn.addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            buttons.appendChild(editBtn);
            buttons.appendChild(deleteBtn);
            buttons.appendChild(completeBtn);

            taskItem.appendChild(taskText);
            taskItem.appendChild(buttons);
            taskList.appendChild(taskItem);
        });
    };

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    renderTasks();
});

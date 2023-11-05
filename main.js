/* 
    This module contains the javascript code logic that drives the app
*/
    const inputText = document.getElementById("textInput");
    const tasks = document.getElementById("tasklist");
    const button = document.getElementById("Button");
    const deleteAll = document.querySelector(".deleteAll");
    const check = document.querySelector(".checkAll");
    
    button.addEventListener("click", addTask);
    deleteAll.addEventListener("click", delAll);
    check.addEventListener("click", checkAll);

    // restore the stored data from the local storage when page loads
    window.addEventListener("load", restoreTasks);

    function addTask() {
        /* function that retrieves the text from the input and passes it to
        the createTask function for further processing */
        const text = inputText.value;
        if (text.trim() === "") {
            alert("Empty task text, enter a task");
            return;
        }

        // store this text in the localStorage
        localStorage.setItem("taskSymphony-" + Date.now(), text);

        // call the createTask function
        const taskItem = createTask(text);
    
        //append new task to the list
        tasks.insertBefore(taskItem, tasks.firstChild);
        inputText.value = "";
    }

    function createTask(text) {
        // function that creates a new task
        const taskItem = document.createElement("li");
        taskItem.innerHTML =`
            <input id="check" type="checkbox">
            <span class="content">${text}</span>
            <button class="delete">Delete</button>
        `;

        // handle the delete button click operation for any task
        const deleteButton = taskItem.querySelector(".delete");
        // add event listener for the delete button
        deleteButton.addEventListener("click", () => {
            taskItem.remove();
            // call the removeTask
            removeTask(text);
        });

        return taskItem;
    }

    function removeTask(text) {
        // function that removes a specific task from the localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (localStorage.getItem(key) === text) {
                localStorage.removeItem(key);
                break;
            }
        }
    }

    function delAll() {
        /* function that deletes all tasks at once and calls the
        deleteAllFromStorage function */
        if (tasks.innerHTML !== "") {
            tasks.innerHTML = "";
            deleteAllFromStorage();
        } else {
            alert("Task list is empty, try adding some tasks");
        }
    }

    function deleteAllFromStorage() {
        // function that deletes all list item from the localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("taskSymphony-")) {
                localStorage.removeItem(key);
            }
        }
    }

    function checkAll() {
        // function that checks all checkboxes at once
        const checks = document.querySelectorAll("#check");
        if (checks.length > 0) {
            checks.forEach(box => {
                box.checked = true;
            });
        } else {
            alert("Task list is empty, try adding some tasks");
        }
    }

    function restoreTasks() {
        /* function that restores the stored state from the local storage
        for all tasks */
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("taskSymphony-")) {
                const text = localStorage.getItem(key);
                // call the createTask function that handles recreating the tasks
                const taskItem = createTask(text);
                tasks.insertBefore(taskItem, tasks.firstChild);
            }
        }
    }

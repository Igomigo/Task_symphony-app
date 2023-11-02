/* 
    This module contains the javascript code that manipulates
    the html buttons to perform some actions.
*/
    const inputText = document.getElementById("textInput");
    const tasks = document.getElementById("tasklist");
    const button = document.getElementById("Button");
    const deleteAll = document.querySelector(".deleteAll");
    const check = document.querySelector(".checkAll");
    
    button.addEventListener("click", addTask);
    deleteAll.addEventListener("click", delAll);
    check.addEventListener("click", checkAll);

    function addTask() {
        const text = inputText.value;
        if (text.trim() === "") {
            console.log("Empty task text");
            return;
        }
        const taskItem = document.createElement("li");
        taskItem.innerHTML =`
            <input id="check" type="checkbox">
            <span class="content">${text}</span>
            <button class="delete">Delete</button>
        `;
    
        const deleteButton = taskItem.querySelector(".delete");
        // add event listener for the delete button
        deleteButton.addEventListener("click", () => {
            taskItem.remove();
        });
    
        //append new task to the list
        tasks.insertBefore(taskItem, tasks.firstChild);
        inputText.value = "";
    }

    function delAll() {
        // function that deletes all tasks at once
        if (tasks.innerHTML !== "") {
            tasks.innerHTML = "";
        } else {
            alert("Task list is empty, try adding some tasks");
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

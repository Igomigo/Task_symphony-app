$(function() {
    // Reference the elements in the html document
    const button = $("#Button");
    const input = $("#textInput");
    const list = $("#tasklist");
    const deleteAll = $(".deleteAll");
    const check_all = $(".checkAll");

    // Add event listeners to the buttons
    button.on("click", addTask);
    deleteAll.on("click", delete_all);
    check_all.on("click", checkall);

    // create the addTask method that adds new tasks to the list
    function addTask() {
        if (input.val().trim() === "") {
            alert("You haven't entered any task yet!");
            return;
        }
        // Create the li element for every new task
        const task = $("<li>").html(`
            <input type="checkbox">
            <span class="content">${input.val()}</span>
            <button class="delete">Delete</button>`);

        task.on("click", ".delete" ,() => {
            task.remove();
        })

        // Append every new task item to the list element
        list.prepend(task);
        input.val("");
    }

    // The deleteAll method that deletes all tasks from the list
    function delete_all() {
        if (!$("#tasklist").has("li").length) {
            alert("Nothing to delete");
            return;
        }
        $("li").remove();
    }

    // The check all method that checks all checkboxes
    function checkall() {
        $('input[type="checkbox"]').prop("checked", true);
    }
});

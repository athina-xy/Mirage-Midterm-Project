let tasks = JSON.parse(localStorage.getItem("mirageTasks")) || [];
let filterMode = "all";

// Add Task
$("#addTaskBtn").on("click", function () {
    let name = $("#taskName").val().trim();
    let desc = $("#taskDesc").val().trim();
    let date = $("#taskDate").val();

    if (!name || !desc || !date) {
        alert("All fields are required.");
        return;
    }

    tasks.push({
        name,
        desc,
        date,
        status: "pending"
    });

    saveTasks();
    showTasks();
    $("#taskName, #taskDesc, #taskDate").val("");
});

// Show Tasks in Table
function showTasks() {
    $("#taskTable").empty();

    let filtered = tasks.filter(t => {
        if (filterMode === "all") return true;
        return t.status === filterMode;
    });

    filtered.forEach((task, index) => {
        $("#taskTable").append(`
            <tr>
                <td contenteditable="true" class="editName">${task.name}</td>
                <td contenteditable="true" class="editDesc">${task.desc}</td>
                <td contenteditable="true" class="editDate">${task.date}</td>
                <td class="text-${task.status === "completed" ? "success" : "warning"}">
                    ${task.status}
                </td>
                <td>
                    <button class="btn btn-success completeBtn" data-i="${index}">Complete</button>
                    <button class="btn btn-danger deleteBtn" data-i="${index}">Delete</button>
                </td>
            </tr>
        `);
    });

    updateSummary();
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem("mirageTasks", JSON.stringify(tasks));
}

// Mark Complete
$(document).on("click", ".completeBtn", function () {
    let i = $(this).data("i");
    tasks[i].status = "completed";
    saveTasks();
    showTasks();
});

// Delete Task
$(document).on("click", ".deleteBtn", function () {
    let i = $(this).data("i");
    tasks.splice(i, 1);
    saveTasks();
    showTasks();
});

// Inline Editing
$(document).on("blur", ".editName, .editDesc, .editDate", function () {
    let row = $(this).closest("tr").index();
    let newName = $(this).parent().find(".editName").text().trim();
    let newDesc = $(this).parent().find(".editDesc").text().trim();
    let newDate = $(this).parent().find(".editDate").text().trim();

    tasks[row].name = newName;
    tasks[row].desc = newDesc;
    tasks[row].date = newDate;
    saveTasks();
});

// Filtering
$(".filterBtn").on("click", function () {
    filterMode = $(this).data("filter");
    showTasks();
});

// Sorting
$(".sortBtn").on("click", function () {
    let mode = $(this).data("sort");

    if (mode === "name") {
        tasks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (mode === "date") {
        tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    saveTasks();
    showTasks();
});

// Summary stats
function updateSummary() {
    let total = tasks.length;
    let pending = tasks.filter(t => t.status === "pending").length;
    let completed = tasks.filter(t => t.status === "completed").length;

    $("#totalTasks").text(total);
    $("#pendingTasks").text(pending);
    $("#completedTasks").text(completed);
}

showTasks();

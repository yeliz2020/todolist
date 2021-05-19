let inputBar = document.querySelector("#task");
let ulDOM = document.getElementById("list");

listeners();

function listeners() {
    ulDOM.addEventListener(
        "click",
        function(ev) {
            if (ev.target.tagName === "LI") {
                ev.target.classList.toggle("checked");
            }
        },
        false
    );
    document.addEventListener("DOMContentLoaded", loadAllTodos);
    ulDOM.addEventListener("click", deleteTodo);
}

function deleteTodo(e) {
    if (e.target.className === "close") {
        e.target.parentElement.remove();
        deleteFromLocale(e.target.previousSibling.textContent);
    }
}

function deleteFromLocale(item) {
    let todos = getFromLocale();
    let index = todos.indexOf(item);

    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function newElement() {
    addTodo();
}

function loadAllTodos() {
    let todos = getFromLocale();

    todos.forEach(function(todo) {
        createListItem(todo);
    });
}


function addTodo() {
    let newValue = inputBar.value;

    if (newValue === "" || newValue.replace(/^\s+|\s+$/g, "").length == 0) {
        // setting Toast message
        $(".error").toast("show");
    } else {
        $(".success").toast("show");
        createListItem(newValue);
        addToLocale(newValue);
    }
    inputBar.value = "";
}

function createListItem(newValue) {
    const listItem = document.createElement("li");
    const spanDOM = document.createElement("span"); // create span

    spanDOM.classList.add("close"); // add class="close" to span
    spanDOM.innerHTML = "x"; // add x inside span

    listItem.appendChild(document.createTextNode(newValue));
    listItem.appendChild(spanDOM);
    ulDOM.appendChild(listItem);
}

function getFromLocale() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addToLocale(newValue) {
    let todos = getFromLocale();
    todos.push(newValue);
    localStorage.setItem("todos", JSON.stringify(todos));
}
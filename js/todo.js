let todo_list = [];

todo_list = JSON.parse(localStorage.getItem("list"));
if (todo_list.length > 0) {
    for (let i = 0; i < todo_list.length; i++) {
        let item = todo_list[i];
        const li = document.createElement("li");
        li.innerHTML = item;

        document.querySelector("#list").appendChild(li);
    }
}

function createSpan() {
    let ul = document.getElementById("list");
    let items = ul.getElementsByTagName("li");
    for (let i = 0; i < items.length; ++i) {
        // do something with items[i], which is a <li> element
        let xSpanDOM = document.createElement("span"); // create span
        xSpanDOM.classList.add("close"); // add class="close" to span
        xSpanDOM.innerHTML = "x"; // add x inside span
        items[i].appendChild(xSpanDOM); //add spans in li elements
    }
}

function close() {
    let closeItem = document.querySelectorAll(".close");
    // Iterate all nodes
    closeItem.forEach((xSpanDOM) => {
        // Attach event listener. Note to preserve the button this-reference
        // by using the non-shorthand function
        xSpanDOM.addEventListener("click", function() {
            let li = this.parentNode;
            li.remove();
        });
    });
}

createSpan();
close();

// List Item Marking
let todoCheck = document.querySelector("ul");
todoCheck.addEventListener("click", function(ev) {
    if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
    }
});

//Add To Do Item
function newElement() {
    // Selecting the input element and get its value
    let inputVal = document.querySelector("#task").value;
    let liDOM = document.createElement("li"); // Create a <li> element
    liDOM.innerHTML = inputVal;
    if (inputVal === "" || inputVal.replace(/^\s+|\s+$/g, "").length == 0) {
        // setting Toast message
        $(".error").toast("show");
    } else {
        $(".success").toast("show");
        document.querySelector("#list").appendChild(liDOM);
        todo_list.push(inputVal); //add it to list
        localStorage.setItem("list", JSON.stringify(todo_list));
    }
    document.querySelector("#task").value = "";

    let xSpanDOM = document.createElement("span"); // create span
    xSpanDOM.classList.add("close"); // add class="close" to span
    xSpanDOM.innerHTML = "x"; // add x inside span
    liDOM.appendChild(xSpanDOM); //add spans in li elements

    close();
}
// extracts user id from the url query
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// get list of todos from API and renders them on screen
fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
	.then((response) => response.json())
	.then((json) => {
		const parentDiv = document.getElementById("todo");
		json.forEach((item) => {
			element = renderTODO(item);
			parentDiv.append(element);
		});
	})
	.catch((error) => {
		let errorElement = document.createElement("h3");
		errorElement.innerText = "Something went wrong...";
		document.body.append(errorElement);
	});

// post new todo to API and renders it on screen
const createNew = () => {
	fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`, {
		method: "POST",
		body: JSON.stringify({
			title: document.getElementById("newtodo").value,
			userId: id,
			completed: false,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	})
		.then((response) => response.json())
		.then((json) => {
			const parentDiv = document.getElementById("todo");
			element = renderTODO(json);
			parentDiv.append(element);
		});
};

// function to render each TODO element
const renderTODO = (item) => {
	let element = document.createElement("div");
	element.setAttribute("style", "display: flex; margin: 10px 20px");
	element.innerHTML = `
		<select name="status">
			<option value="todo" ${item.completed ? "" : "selected"}>TODO</option>
			<option value="pending">Pending</option>
			<option value="completed" ${item.completed ? "selected" : ""}>Completed</option>
		</select>&nbsp;${item.title}`;
	return element;
};

// handle submit button
const submitBtn = document.getElementById("btn");
submitBtn.addEventListener("click", createNew);

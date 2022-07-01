// fetch the API and renders each user as a list element
fetch("https://jsonplaceholder.typicode.com/users")
	.then((response) => response.json())
	.then((json) => {
		const parentDiv = document.getElementById("users");
		json.forEach((user) => {
			let element = document.createElement("li");
			element.innerHTML = `<a href="todo.html?id=${user.id}">${user.name}</a>`;
			parentDiv.append(element);
		});
	})
	.catch((error) => {
		let errorElement = document.createElement("h3");
		errorElement.innerText = "Something went wrong...";
		document.body.append(errorElement);
	});

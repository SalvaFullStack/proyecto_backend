// const baseURL = "http://localhost:3000/api/bands";

// const tasksContainer = document.getElementById("bands");

// let tasksState = [];

// main();

// async function main() {
//   // Request al backend
//   const res = await fetch("http://localhost:3000/api/bands");
//   const bands = await res.json();
//   console.log(res);
//   bandsState = [...bands];
//   render();
// }

// function render() {
//   tasksContainer.innerHTML = "";

//   tasksState.forEach(({ title, tags, _id }) => {
//     tasksContainer.innerHTML += `
// 		<li class="list-group-item">
// 							<div class="d-flex">
// 								<div class="flex-grow-1">
// 									${title}
// 									${tags
//                     .map(
//                       (tag) =>
//                         `<span class="mx-1 badge rounded-pill text-bg-dark">${tag.name}</span>`
//                     )
//                     .join("")}

// 								</div>

// 								<div>
// 									<button class="btn btn-primary edit-btn" data-id="${_id}" >Editar</button>
// 									<button class="btn btn-danger delete-btn" data-id="${_id}" >Borrar</button>
// 								</div>
// 							</div>
// 						</li>
// 		`;
//   });
// }

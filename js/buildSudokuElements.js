window.addEventListener("DOMContentLoaded", () => {
	const gridContainer = document.getElementById("grid");
	const newPuzzle = document.getElementById("new-puzzle");
	const submit = document.getElementById("submit");
	const closeButton = document.getElementById("close");
	const winScreen = document.getElementById("win-screen");
	let diff = document.getElementById("select-id");

	let grid = [];

	let time = 0;
	let difficulty = "easy";

	setInterval(() => {
		time += 1;
	}, 1000);

	for (let i = 0; i < 81; i++) {
		let gridElement = document.createElement("input");

		gridElement.autocomplete = "off";
		gridElement.id = String(i);
		gridElement.maxLength = "1";
		gridElement.type = "text";
		gridElement.oninput = function () {
			this.value = this.value
				.replace(/[^0-9.]/g, "")
				.replace(/(\..*?)\..*/g, "$1");
			checkLegalMove(i, createRuleGrids());
			submitSudoku(createRuleGrids(), time);

		};
		gridElement.onmouseover = function () {
			showHoverHints(i, "hover");
		};
		gridElement.onclick = function () {
			showHoverHints(i, "click");
		};
		gridElement.onfocus = function () {
			showHoverHints(i, "click");
		};

		if ([2, 11, 20, 29, 38, 47, 56, 65, 74].includes(i)) {
			gridElement.className += " left-border";
		}
		if ([5, 14, 23, 32, 41, 50, 59, 68, 77].includes(i)) {
			gridElement.className += " right-border";
		}
		if (i > 17 && i < 27) {
			gridElement.className += " top-border";
		}
		if (i > 44 && i < 54) {
			gridElement.className += " bottom-border";
		}
		gridElement.className += " grid-element";

		gridContainer.append(gridElement);
	}
	buildSudoku(gridContainer, diff.value);

	submit.addEventListener("click", () => {
		submitSudoku(createRuleGrids(), time);
	});

	closeButton.addEventListener("click", () => {
		winScreen.style.display = "none";
	});

	newPuzzle.addEventListener("click", () => {
		console.log(diff.value);
		time = 0;
		buildSudoku(gridContainer, diff.value);
	});
});

function buildSudoku(gridContainer, diff) {
	const newPuzzle = document.getElementById("new-puzzle");
	let grid = [];

	for (let i = 0; i < 81; i++) {
		let el = gridContainer.getElementsByClassName("grid-element");
		grid.push(el[i]);
	}

	let sudoku = generateNewSudoku(diff);

	for (let i = 0; i < 81; i++) {
		grid[i].style.fontSize = "0vh";
		setTimeout(() => {
			grid[i].style.fontSize = "3vh";
			grid[i].value = sudoku[i];
		}, 150);
	}
}

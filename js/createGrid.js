window.addEventListener("DOMContentLoaded", () => {
	const gridContainer = document.getElementById("grid");

	let grid = [];

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
		};
		gridElement.onmouseover = function () {
			showHoverHints(i, "hover");
		};
		gridElement.onclick = function () {
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

	for (let i = 0; i < 81; i++) {
		let el = gridContainer.getElementsByClassName("grid-element");
		grid.push(el[i]);
	}

	let sudoku = generateNewSudoku();

	for (let i = 0; i < 81; i++) {
		grid[i].value = sudoku[i];
	}
});

window.addEventListener("DOMContentLoaded", () => {
	const gridContainer = document.getElementById("grid");
	const newPuzzle = document.getElementById("new-puzzle");
	const submit = document.getElementById("submit");
	const closeButton = document.getElementById("close");
	const winScreen = document.getElementById("win-screen");
	let diff = document.getElementById("select-id");
	const timer = document.getElementsByClassName("timer");

	let grid = [];
	let sudoku;

	let time,
		seconds = 0,
		minutes = 0,
		hours = 0;

	let difficulty = "easy";

	setInterval(() => {
		seconds += 1;
		if (seconds > 59) {
			minutes += 1;
			seconds = 0;
		}
		if (minutes > 59) {
			hours += 1;
			minutes = 0;
		}
		time =
			String(hours) + "h " + String(minutes) + "m " + String(seconds) + "s ";

		timer[0].textContent = time;
	}, 1000);

	for (let i = 0; i < 81; i++) {
		let gridElement = document.createElement("input");

		gridElement.autocomplete = "off";
		gridElement.id = String(i);
		gridElement.maxLength = "1";
		gridElement.type = "text";
		gridElement.inputMode = "numeric";
		gridElement.oninput = function () {
			this.value = this.value
				.replace(/[^1-9.]/g, "")
				.replace(/(\..*?)\..*/g, "$1");
			checkLegalMove(i, createRuleGrids());
			submitSudoku(createRuleGrids(), time, difficulty);
		};
		gridElement.onmouseover = function () {
			showHoverHints(i, "hover");
		};
		gridElement.onclick = function () {
			showHoverHints(i, "hover");
		};
		gridElement.onfocus = function () {
			showHoverHints(i, "hover");
		};
		gridElement.addEventListener("keydown", (e) => {
			if (e.key == "ArrowLeft" && document.getElementById(String(i - 1))) {
				document.getElementById(String(i - 1)).focus();
			} else if (
				e.key == "ArrowRight" &&
				document.getElementById(String(i + 1))
			) {
				document.getElementById(String(i + 1)).focus();
			} else if (e.key == "ArrowUp" && document.getElementById(String(i - 9))) {
				document.getElementById(String(i - 9)).focus();
			} else if (
				e.key == "ArrowDown" &&
				document.getElementById(String(i + 9))
			) {
				document.getElementById(String(i + 9)).focus();
			}
			if(e.key == "Backspace"){
				gridElement.value = ""
			}
		});

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
	sudoku = buildSudoku(gridContainer, diff.value);

	submit.addEventListener("click", () => {
		console.log(diff.value);
		submitSudoku(createRuleGrids(), time, diff.value, sudoku);
	});

	closeButton.addEventListener("click", () => {
		winScreen.style.display = "none";
	});

	newPuzzle.addEventListener("click", () => {
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
	return sudoku;
}

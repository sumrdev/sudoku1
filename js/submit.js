function submitSudoku(masterList, time, diff, sudoku) {
	const gridContainer = document.getElementsByClassName("grid-element");
	const winScreenSubmit = document.getElementById("win-screen");

	console.log(sudoku);
	for (let i = 0; i < 81; i++) {
		if (gridContainer[i].value == "") {
			return illegalSubmit("you didn't finish!");
		}
	}

	for (let i = 0; i < 9; i++) {
		if (
			hasDuplicates(convertMarkupToIntegers(masterList.horizontalGrid[i])) ||
			hasDuplicates(convertMarkupToIntegers(masterList.verticalGrid[i])) ||
			hasDuplicates(convertMarkupToIntegers(masterList.x3Grid[i]))
		) {
			return illegalSubmit("wrong solve!");
		}
	}
	for (let i = 0; i < 81; i++) {
		if (sudoku[i] != "" && sudoku[i] != gridContainer[i].value) {
			return illegalSubmit("Cheating detected");
		}
	}
	return winningSubmit(winScreenSubmit, time, diff);
}

function illegalSubmit(reason) {
	// notification("You can't submit this, " + reason, false);
}

function winningSubmit(winScreenSubmit, time, diff) {
	const timeText = document.getElementById("time");
	const diffText = document.getElementById("difficulty");

	console.log(diff);
	winScreenSubmit.style.display = "inherit";
	timeText.textContent = time;
	diffText.textContent = diff.toUpperCase();
}

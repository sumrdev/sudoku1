function submitSudoku(masterList, time) {
	const gridContainer = document.getElementsByClassName("grid-element");
	const winScreenSubmit = document.getElementById("win-screen");

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
	return winningSubmit(winScreenSubmit, time);
}

function illegalSubmit(reason) {
	notification("You can't submit this, " + reason, false);
}

function winningSubmit(winScreenSubmit, time) {
	const timeText = document.getElementById("time");
	winScreenSubmit.style.display = "inherit";
	timeText.textContent = time + "s";
}

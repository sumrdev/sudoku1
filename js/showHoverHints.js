function showHoverHints(index, interaction) {
	const gridContainer = document.getElementsByClassName("grid-element");

	const x3squares = [
		[0, 1, 2, 9, 10, 11, 18, 19, 20],
		[3, 4, 5, 12, 13, 14, 21, 22, 23],
		[6, 7, 8, 15, 16, 17, 24, 25, 26],
		[27, 28, 29, 36, 37, 38, 45, 46, 47],
		[30, 31, 32, 39, 40, 41, 48, 49, 50],
		[33, 34, 35, 42, 43, 44, 51, 52, 53],
		[54, 55, 56, 63, 64, 65, 72, 73, 74],
		[57, 58, 59, 66, 67, 68, 75, 76, 77],
		[60, 61, 62, 69, 70, 71, 78, 79, 80],
	];

	function x3SquareCheck(index) {
		for (let i = 0; i < x3squares.length; i++) {
			if (x3squares[i].includes(index)) {
				return x3squares[i];
			}
		}
	}

	for (let i = 0; i < 81; i++) {
		if (interaction == "hover" && gridContainer[i].value == "") {
			gridContainer[index].style.backgroundColor = "#33333f";
		} else {
			gridContainer[i].style.backgroundColor = "#22222a";
		}

		if (
			((interaction == "hover"  || interaction == "focus") &&
				gridContainer[index].value != "") &&
				index != i &&
			(Math.floor(index / 9) == Math.floor(i / 9) &&
				gridContainer[index].value != "") ||
			(Math.floor(index % 9) == i % 9 && gridContainer[index].value != "")
		) {
			gridContainer[i].style.backgroundColor = "#33333f";
		} else if (interaction == "click") {
			gridContainer[index].style.backgroundColor = "#444444";
		} else {
			gridContainer[i].style.backgroundColor = "#22222a";
		}
		if ((interaction == "hover"  || interaction == "focus") &&
			gridContainer[index].value == gridContainer[i].value && gridContainer[index].value != "") {
			gridContainer[i].style.backgroundColor = "#555575";
		}
		if (
			x3SquareCheck(index).includes(i) &&
			interaction == "hover" &&
			gridContainer[index].value != ""
		) {
			gridContainer[i].style.backgroundColor = "#33333f";
		}
	}
}

function checkLegalMove(n, masterList) {
	const gridContainer = document.getElementsByClassName("grid-element");
	const classOfInput = gridContainer[n].className;
	let x3 = [];
	let vert = [];
	let hor = [];
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (parseInt(masterList.x3Grid[i][j].id) == n) {
				x3 = masterList.x3Grid[i];
			}
		}

		if (i % 9 == n % 9) {
			vert = masterList.verticalGrid[i % 9];
		}

		if (i == Math.floor(n / 9)) {
			hor = masterList.horizontalGrid[i];
		}
	}
	x3Int = convertMarkupToIntegers(x3);
	vertInt = convertMarkupToIntegers(vert);
	horInt = convertMarkupToIntegers(hor);

	gridContainer[n].classList.toggle(
		"error",
		hasDuplicates(x3Int) || hasDuplicates(vertInt) || hasDuplicates(horInt)
	);
}

function convertMarkupToIntegers(arr) {
	let intArr = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].value != "") intArr.push(arr[i].value);
	}
	return intArr;
}

function hasDuplicates(arr) {
	return new Set(arr).size !== arr.length;
}

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

function createRuleGrids() {
	const gridContainer = document.getElementsByClassName("grid-element");

	let grid = [];
	let horizontalGrid = [];
	let verticalGrid = [];
	let x3Grid = [[], [], [], [], [], [], [], [], []];

	for (let i = 0; i < 81; i++) {
		let el = gridContainer;
		grid.push(el[i]);
	}

	for (let i = 0; i < 9; i++) {
		horizontalGrid.push([]);
		for (let j = 0; j < 9; j++) {
			horizontalGrid[i].push(grid[i * 9 + j]);
		}
	}

	for (let i = 0; i < 9; i++) {
		verticalGrid.push([]);
		for (let j = 0; j < 9; j++) {
			verticalGrid[i].push(horizontalGrid[j][i]);
		}
	}

	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			for (let x = 0; x < x3squares.length; x++) {
				if (x3squares[x].includes(i * 9 + j)) {
					x3Grid[x].push(grid[i * 9 + j]);
				}
			}
		}
	}
	return { horizontalGrid, verticalGrid, x3Grid };
}

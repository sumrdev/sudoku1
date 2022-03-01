function createSudoGrid(gridType) {
	switch (gridType) {
		case "empty": {
			let g = [];
			for (let i = 0; i < 9; i++) {
				g.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
			}
			return g;
		}

		case "base": {
			let g = [];
			let a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
			a = shuffle(a);
			g.push(a);
			for (let i = 0; i < 8; i++) {
				g.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
			}
			return g;
		}
		case "fakebase": {
			let g = [];
			let a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
			let b = [1, 2, 3, 4, 5, 6, 7, 8, 9];

			a = shuffle(a);
			b = shuffle(b);
			g.push(a);
			g.push(b);
			for (let i = 0; i < 7; i++) {
				g.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
			}
			return g;
		}
	}
}

function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}

function printGrid(grid) {
	for (let i = 0; i < grid.length; i++) {
		console.log(
			grid[i][0],
			grid[i][1],
			grid[i][2],
			grid[i][3],
			grid[i][4],
			grid[i][5],
			grid[i][6],
			grid[i][7],
			grid[i][8]
		);
	}
	console.log(" ");
}

function checkValidMove(x, y, n, grid) {
	for (let i = 0; i < 9; i++) {
		if (grid[x][i] == n) {
			return false;
		}
	}

	for (let i = 0; i < 9; i++) {
		if (grid[i][y] == n) {
			return false;
		}
	}
	const x0 = Math.floor(y / 3) * 3;
	const y0 = Math.floor(x / 3) * 3;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (grid[y0 + i][x0 + j] == n) {
				return false;
			}
		}
	}
	return true;
}

function solve(grid) {
	for (let x = 0; x < 9; x++) {
		for (let y = 0; y < 9; y++) {
			if (grid[x][y] == 0) {
				for (let n = 1; n < 10; n++) {
					if (checkValidMove(x, y, n, grid)) {
						grid[x][y] = n;
						solve(grid);
						if (grid[8][8] != 0) {
							return grid;
						}
						grid[x][y] = 0;
					}
				}
				return grid;
			}
		}
	}
	return grid;
}

function convertToSimpleList(grid) {
	let singleArr = [];
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			singleArr.push(grid[i][j]);
		}
	}
	return singleArr;
}

function generateDifficulty(grid, difficulty) {
	var holePercentage;

	if (difficulty == "easy") {
		holePercentage = 81 - 50;
	}
	if (difficulty == "medium") {
		holePercentage = 81 - 40;
	}
	if (difficulty == "hard") {
		holePercentage = 81 - 30;
	}
	if (difficulty == "super-hard") {
		holePercentage = 81 - 25;
	}

	return deleteRandomNumbers(grid, holePercentage);

	function deleteRandomNumbers(arr, n) {
		let indexToDel = [];
		let i = 0;
		while (i < n) {
			a = Math.floor(Math.random() * arr.length);
			if (!indexToDel.includes(a)) {
				indexToDel.push(a);
				i++;
			}
		}

		for (let i = 0; i < n; i++) {
			arr[indexToDel[i]] = "";
		}
		return arr;
	}
}

function generateNewSudoku(difficulty) {
	let grid = createSudoGrid("base");
	let n = 0;
	if (n < 1) {
		n += 1;
		solve(grid);
	}
	grid = convertToSimpleList(grid);
	return generateDifficulty(grid, difficulty);
}

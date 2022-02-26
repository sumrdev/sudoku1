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

function findPossibleNumbers(grid, x, y, n) {
	let possible = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	for (let j = 0; j < grid[x].length; j++) {
		if (grid[x][j] == n) {
			possible = possible.filter((n) => n != grid[x][j]);
		}
	}

	for (let n = 1; n < 10; n++) {
		for (let j = 0; j < grid[x].length; j++) {
			if (grid[j][y] == n) {
				possible = possible.filter((n) => n != grid[j][y]);
			}
		}
	}

	const x0 = Math.floor(y / 3) * 3;
	const y0 = Math.floor(x / 3) * 3;

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (grid[y0 + i][x0 + j] == n) {
				possible = possible.filter((n) => n != grid[y0 + i][x0 + j]);
			}
		}
	}
	return possible;
}

function createSudoku(grid) {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] == 0) {
				for (let n = 1; n < 10; n++) {
					let possible = findPossibleNumbers(grid, i, j, n);
					if (possible.length > 0) {
						grid[i][j] =
							possible[Math.floor(Math.random() * possible.length - 1)];
					} else {
						j--;
					}
				}
			}
		}
		return grid;
	}
}
let grid = createSudoGrid("base");
printGrid(grid);
createSudoku(grid);
printGrid(grid);

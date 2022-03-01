let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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

console.log(deleteRandomNumbers(arr, 5));

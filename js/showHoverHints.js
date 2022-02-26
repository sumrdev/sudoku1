function showHoverHints(index, interaction) {
	const gridContainer = document.getElementsByClassName("grid-element");
	for (let i = 0; i < 81; i++) {
		if (interaction == "hover" && gridContainer[i].value == "") {
			gridContainer[index].style.backgroundColor = "#33333f";
		} else {
			gridContainer[i].style.backgroundColor = "#22222a";
		}
		if (
			(interaction == "hover" &&
				gridContainer[index].value != "" &&
				gridContainer[index].value == gridContainer[i].value) ||
			(Math.floor(index / 9) == Math.floor(i / 9) &&
				gridContainer[index].value != "") ||
			(Math.floor(index % 9) == i % 9 && gridContainer[index].value != "")
		) {
			gridContainer[i].style.backgroundColor = "#33333f";
		} else if (interaction == "click") {
			gridContainer[index].style.backgroundColor = "#44444f";
		} else {
			gridContainer[i].style.backgroundColor = "#22222a";
		}
	}
}

window.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById("grid")
    
    let smallGrid = [];
    for (let i = 0; i < 9; i++) {
        smallGrid.push(document.createElement('div'))
        smallGrid[i].className ="small-grid"
        smallGrid[i].id = String("small" + i)
        gridContainer.append(smallGrid[i])
        for (let j = 0; j < 9; j++) {
            let gridElement = document.createElement("input")
            gridElement.autocomplete = "off"
            gridElement.id = String(i*9+j)
            gridElement.className = "grid-element"


            gridElement.maxLength="1"
            gridElement.type ="text"
            gridElement.name="number"

            smallGrid[i].append(gridElement)
        }
    }
});
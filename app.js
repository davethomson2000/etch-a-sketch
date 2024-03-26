const resetButton = document.querySelector("#reset")
const normalButton = document.querySelector("#normal")
const rainbowButton = document.querySelector("#rainbow")
const darkenButton = document.querySelector("#darken")

let mode = "Normal"

resetButton.addEventListener("click",() => drawSketchArea())

normalButton.addEventListener("click", changeMode)
rainbowButton.addEventListener("click", changeMode)
darkenButton.addEventListener("click", changeMode)

function randomRGBValue() {
    return Math.floor(Math.random() * 255)
}

function changeMode(event) {
    let modeText = document.querySelector("#mode")
    const modeClicked = event.target.id 
    
    // Capitalise first letter
    mode = modeClicked[0].toUpperCase() + modeClicked.slice(1)
    
    modeText.textContent = mode
    drawSketchArea()
}

function drawSketchArea(boxesPerRow) {
    if (!boxesPerRow) {
        boxesPerRow = Math.min(+prompt("How many boxes per row?"), 40)
    }
     
    const sketchArea = document.querySelector("#sketch-area")

    // clean up sketch area
    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.firstChild)
    }

    //create grid of divs (boxes) which wrap
    for (let i=1; i <= (boxesPerRow * boxesPerRow); i++) {
        const div = document.createElement("div")
        const widthInPixels = sketchArea.clientWidth / boxesPerRow
        
        div.classList.add("sketch-box")
        div.style.width = widthInPixels + "px"
        div.style.height = div.style.width
        
        switch(mode) {
            case "Normal":
                div.addEventListener("mouseover",() => {div.classList.add("normal-hover")})
                break
            case "Rainbow":
                div.addEventListener("mouseover",() => {div.style.background = `rgb(${randomRGBValue()}, ${randomRGBValue()}, ${randomRGBValue()})`})
                break
            case "Darken":
                div.classList.add("darken-hover")
                div.addEventListener("mouseover",() => {div.style.opacity = +div.style.opacity + 0.1})
                break
        }
        sketchArea.appendChild(div)
    }
}

drawSketchArea(20)
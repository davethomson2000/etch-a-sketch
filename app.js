const resetButton = document.querySelector("#reset")
const changeResolutionButton = document.querySelector("#choose-resolution")
const normalButton = document.querySelector("#normal")
const rainbowButton = document.querySelector("#rainbow")
const darkenButton = document.querySelector("#darken")
const autoDrawButton = document.querySelector('#auto-draw')
const clickToDrawButton = document.querySelector('#click-to-draw')

let paintMode = "Normal"
let drawMethod = "Click-to-draw"
let boxesPerRow = 20

//stop the cursor changing on dragover to look better for user
document.addEventListener("dragenter", (e) => e.preventDefault())
document.addEventListener("dragover", (e) => e.preventDefault())

resetButton.addEventListener("click", () => drawSketchArea(boxesPerRow))
changeResolutionButton.addEventListener("click", () => drawSketchArea(0))

normalButton.addEventListener("click", changePaintMode)
rainbowButton.addEventListener("click", changePaintMode)
darkenButton.addEventListener("click", changePaintMode)

autoDrawButton.addEventListener("click", changeDrawMethod)
clickToDrawButton.addEventListener("click", changeDrawMethod)

function randomRGBValue() {
    return Math.floor(Math.random() * 255)
}

function changeDrawMethod(event) {
    let drawMethodText = document.querySelector("#draw-method")
    const modeClicked = event.target.id

    // Capitalise first letter
    drawMethod = modeClicked[0].toUpperCase() + modeClicked.slice(1)

    drawMethodText.textContent = drawMethod
    drawSketchArea(boxesPerRow)
}

function changePaintMode(event) {
    let paintModeText = document.querySelector("#paint-mode")
    const modeClicked = event.target.id

    // Capitalise first letter
    paintMode = modeClicked[0].toUpperCase() + modeClicked.slice(1)

    paintModeText.textContent = paintMode
    drawSketchArea(boxesPerRow)
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
    for (let i = 1; i <= (boxesPerRow * boxesPerRow); i++) {
        const div = document.createElement("div")
        const widthInPixels = sketchArea.clientWidth / boxesPerRow

        div.classList.add("sketch-box")
        div.style.width = widthInPixels + "px"
        div.style.height = div.style.width
        div.draggable = true

        //set mouse event type that will be used when drawing based on the mode selected 
        let mouseEventTypes = []
        switch (drawMethod) {
            case "Click-to-draw":
                mouseEventTypes.push("dragenter")
                mouseEventTypes.push("click")
                break
            case "Auto-draw":
                mouseEventTypes.push("mouseover")
                break
            default:
                mouseEventTypes.push("mouseover")
        }
        for (let mouseEventType of mouseEventTypes) {
            switch (paintMode) {
                case "Normal":
                    div.addEventListener(mouseEventType, () => { div.classList.add("normal-hover") })
                    break
                case "Rainbow":
                    div.addEventListener(mouseEventType, () => { div.style.background = `rgb(${randomRGBValue()}, ${randomRGBValue()}, ${randomRGBValue()})` })
                    break
                case "Darken":
                    div.classList.add("darken-hover")
                    div.addEventListener(mouseEventType, () => { div.style.opacity = +div.style.opacity + 0.1 })
                    break
            }
        }
        sketchArea.appendChild(div)
    }
}

drawSketchArea(boxesPerRow)
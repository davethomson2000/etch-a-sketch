const reset = document.querySelector("#reset")
reset.addEventListener("click",updateSketchArea)


function updateSketchArea() {
    const pixelsPerRow = +prompt("How many pixels per row?")
    const sketchArea = document.querySelector("#sketch-area")
    let div = document.createElement("div")
    let widthInPixels = 800/pixelsPerRow
    div.style.width = widthInPixels + "px"
    div.style.height = div.style.width
    div.style.borderStyle = "dashed"
    div.style.borderColor = "coral"
    div.style.flex = "0 0 auto"
    div.textContent = "Hi"
    sketchArea.appendChild(div)
}
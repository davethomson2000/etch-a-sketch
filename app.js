const reset = document.querySelector("#reset")
reset.addEventListener("click",updateSketchArea)


function updateSketchArea() {
    const boxesPerRow = +prompt("How many boxes per row?")
    const sketchArea = document.querySelector("#sketch-area")
    
    // clean up sketch area
    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.firstChild)
    }

    for (let i=1; i <= (boxesPerRow * boxesPerRow); i++) {
        const div = document.createElement("div")
        const widthInPixels = sketchArea.clientWidth / boxesPerRow
        
        div.classList.add("sketch-box")
        div.style.width = widthInPixels + "px"
        div.style.height = div.style.width
        div.addEventListener("mouseover",() => {div.classList.toggle("normal-hover")})
        sketchArea.appendChild(div)
    }
}
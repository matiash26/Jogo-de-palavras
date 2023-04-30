const keyboard = document.querySelector(".keyboard")
const displayWrite = document.querySelector(".writeDisplay")

const letters = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O","P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L","BACKSPACE",
    "Z", "X", "C", "V", "B", "N", "M", "ENTER"
]

function createKeyBoard () {
    const keyNodeList = []
    for(const key of letters) {
            const keyboard_btn = document.createElement("button")
            if(key === "BACKSPACE" || key === "ENTER") {
                keyboard_btn.setAttribute("class", "keyBtn bigger")
            }else{
                keyboard_btn.setAttribute("class", "keyBtn")
            }
            keyboard_btn.innerText = key
            keyNodeList.push(keyboard_btn)
    }
    for(key of keyNodeList) {
        keyboard.appendChild(key)
    }
}
function createDisplay () {
    const totalItems = 5 * 6
    for(let x = 0; x < totalItems; x++){
        const display = document.createElement("div")
        display.setAttribute("class", "item blocked")
        displayWrite.appendChild(display)
    }

}

createDisplay()
createKeyBoard()
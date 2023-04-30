let index = 0
let nextRow = 0
let text = ""

const keyboardDOM = document.querySelectorAll(".keyBtn")
const box = document.querySelectorAll(".item")
const title = document.querySelector(".title")


function randomWord() {
    const word = [
        "susto", "amigo", "testa",
        "feliz", "festa", "tempo",
        "casar", "vista", "verde",
        "filme", "falar", "dente",
        "corpo", "corre", "beber",
        "comer", "estar", "fazer",
        "saber", "garra", "santo",
        "pasto", "caixa", "perto", 
        "praia", "quase", "querer", 
        "risos","sabor",  "solto"
    ];
    const choose = Math.floor(Math.random() * 20)
    text = word[choose].toLocaleLowerCase()
}
async function writeInDisplay(word) {
    const boxList = new Array(...box).splice(nextRow, 5)
    const wordFromDOM = boxList.reduce((acc, value) => acc += value.innerText, "").toLowerCase()
    const wordLength = wordFromDOM.split("").length

    if (letters.includes(word)) {
        if (word !== "BACKSPACE" && word !== "ENTER") {
            boxList[index].innerText = word
            index < 4 ? index++ : index
        } else if (word === "BACKSPACE") {
            boxList[index].innerText = ""
            index > 0 ? index-- : index
        } else if (word === "ENTER" && wordLength === 5) {
            const response = await fetch("https://api.dicionario-aberto.net/word/" + wordFromDOM)
            const checkWord = await response.json()
            if (checkWord[0]) {
                checkWordPosition(wordFromDOM, text, boxList)
                nextRow += 5
                index = 0
                const releaseNexrRow = new Array(...box).splice(nextRow, 5)
                for (let box of releaseNexrRow) {
                    box.classList.remove("blocked")
                }
            }
        }
    }
}
function captureKeyboard(event) {
    const word = event.key.toUpperCase()
    writeInDisplay(word)

}
function captureKeyboardDOM(event) {
    const word = event.target.innerText.toUpperCase()
    writeInDisplay(word)
}
function checkWordPosition(current, random, element, row) {
    const randomWord = random.split("")
    const currentWord = current.split("")
    if (randomWord.join("") === currentWord.join("")) {
        title.innerText = `VOCÊ ACERTOU A PALAVRA ${text}`
    } else if (row === 5 && randomWord.join("") !== currentWord.join("")) {
        title.innerText = `VOCÊ ERROU A PALAVRA ERA ${text}`
    }
    for (let x = 0; x < randomWord.length; x++) {
        const keyDOMList = new Array(...keyboardDOM)
        const keyDOM = keyDOMList.find(letter => letter.innerText === current[x].toUpperCase())
        if (randomWord.includes(currentWord[x])) {
            if (currentWord[x] === randomWord[x]) {
                element[x].classList.add("right")
                keyDOM.classList.add("right")
            } else {
                element[x].classList.add("wrongPosition")
                keyDOM.classList.add("wrongPosition")
            }
        } else {
            element[x].classList.add("nothing")
            keyDOM.classList.add("nothing")
        }
    }
}

randomWord()

for (key of keyboardDOM) {
    key.addEventListener("click", captureKeyboardDOM)
}
window.addEventListener("keyup", captureKeyboard)
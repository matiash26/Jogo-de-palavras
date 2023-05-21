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
        "praia", "quase",  
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
            const maxCaractere = wordLength === 5 ? wordLength - 1 : wordLength
            //o length irá retornar 5 items da lista, porém a indice termina em 4, já que começa no 0, nisso eu preciso subtrair -1 caso chegue ao máximo
            boxList[maxCaractere].innerText = word
            
        } else if (word === "BACKSPACE") {
            let notNegative = wordLength - 1 < 0 ? wordLength : wordLength - 1
            //caso o numero de caracteres for menor que 0 pegue o valor atual, caso ao contrário decremente
            //para que tenha o delete da palavra
            boxList[notNegative].innerText = ""

        } else if (word === "ENTER" && wordLength === 5) {
            const response = await fetch("https://api.dicionario-aberto.net/word/" + wordFromDOM)
            const checkWord = await response.json()
            if (checkWord[0]) {
                checkWordPosition(wordFromDOM, text, boxList, nextRow)
                nextRow += 5
                const releaseNexrRow = new Array(...box).splice(nextRow, 5)
                for (let box of releaseNexrRow) {
                    box.classList.remove("blocked")
                }
            }else {
                title.innerText = "PALAVRA NÃO RECONHECIDA TENTE OUTRA"
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
        title.innerText = `VOCÊ ACERTOU A PALAVRA ${text.toUpperCase()}`
        removeEventListener("click",captureKeyboardDOM)
        removeEventListener("keyup",captureKeyboard)
    } else if (row === 25 && randomWord.join("") !== currentWord.join("")) {
        title.innerText = `VOCÊ ERROU A PALAVRA ERA ${text.toUpperCase()}`
        removeEventListener("click",captureKeyboardDOM)
        removeEventListener("keyup",captureKeyboard)
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
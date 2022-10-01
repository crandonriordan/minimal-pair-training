function makeWord(written, spokenFile, translation) {
    return {
        written,
        spokenFile,
    };
}

let chosenWord;
let pair;
let choiceIndex;

// 2D array pairs[i] = int[2] of Word
const pairs = [
    [
        makeWord("মাজা", "./audio/মাজা.mp3", "to wipe"),
        makeWord("মজা", "./audio/মজা.mp3", "fun"),
    ],
    [
        makeWord("কাল", "./audio/কাল.mp3", "time"),
        makeWord("খাল", "./audio/খাল.mp3", "canal, creek"),
    ],
    [
        makeWord("ছাই", "./audio/ছাই.mp3", "ashes"),
        makeWord("চাই", "./audio/চাই.mp3", "I want"),
    ],
    [
        makeWord("বাজ.mp3", "./audio/বাজ.mp3", "thunder"),
        makeWord("চাই", "./audio/চাই.mp3", "fry"),
    ],
];
function weightedRandom(probConfig) {
    let i,
        sum = 0,
        r = Math.random();
    for (i in probConfig) {
        sum += probConfig[i];
        if (r <= sum) return i;
    }
}

function displayChoice(pair) {
    let left = document.getElementById("left");
    let right = document.getElementById("right");
    left.innerHTML = pair[0].written + "<-";
    right.innerHTML = pair[1].written + "->";
}
//
document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        pair = pairs[0];
        displayChoice(pair);
    }
});

document.getElementById("play-button").addEventListener("click", () => {
    choiceIndex = weightedRandom({ 0: 0.7, 1: 0.3 });
    chosenWord = pair[choiceIndex];
    playAudio(chosenWord);
});

function playAudio(word) {
    let audio = new Audio(word.spokenFile);
    audio.play();
}

addEventListener("keydown", (event) => {
    let left = 37;
    let right = 39;
    if (event.keyCode == left) {
        if (choiceIndex == 0) {
            showCorrect();
        } else {
            showIncorrect();
        }
    } else if (event.keyCode == right) {
        if (choiceIndex == 1) {
            showCorrect();
        } else {
            showIncorrect();
        }
    }
});

function showCorrect() {
    let correctEl = document.querySelector(".correct");
    correctEl.classList.remove("is-hidden");
    setTimeout(() => {
        correctEl.classList.add("is-hidden");
    }, "1000");
}

function showIncorrect() {
    let incorrectEl = document.querySelector(".incorrect");
    incorrectEl.classList.remove("is-hidden");
    setTimeout(() => {
        incorrectEl.classList.add("is-hidden");
    }, "1000");
}

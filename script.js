const guessInput = document.querySelector(".guess-input");
const guessList = document.querySelector(".guesses");

var synListFirst;
var synListSecond;
var guessText;
var guessBreak;
var guessFirst;
var guessSecond;
var newGuessLeft;
var newGuessRight;

var gameOver = false;

var guessedWords = [];

var row = 0;

var gamesPlayed = 0;
var gamesWonOne = 0;
var gamesWonTwo = 0;
var gamesWonThree = 0;
var gamesWonFour = 0;

var currentStreak = 0;
var highestStreak = 0;

let startDate = new Date('7/17/2023');
let currDate = new Date();
currDate.setHours(0, 0, 0, 0);

let diff = currDate.getTime() - startDate.getTime();
let msInDay = 1000 * 3600 * 24;
diff = diff/msInDay;

var day = currDate;

const wordToEmojiList = [['fire man', '🔥👨'], ['flower pot','🌼🍲'],
 ['home work','🏠💼'], ['gift card','🎁🃏'], ['golf club','🏌️‍♂️♣️'], ['sand castle','🏖️🏰'],
  ['tree house','🌳🏚️'], ['road rage','🛣️😡'], ['sun glasses','☀️🤓'], ['water park','🌊🎢'],
   ['horse fly','🐴✈️'], ['stop sign','✋⚠️'], ['team work',''], ['family tree',''], ['head phones',''],
    ['sweat shirt',''], ['bottle cap',''], ['fishing pole',''], ['tug boat',''],
     ['tree bark',''], ['dinner time',''], ['mechanical pencil',''], ['tree top',''],
      ['wheel barrow',''], ['flower bed',''], ['light house',''], ['red light',''],
       ['play list',''], ['water slide',''], ['chicken coop',''],
        ['spa day',''], ['high tide',''], ['laser tag',''], ['drive way',''], ['spider web',''],
         ['shoe horn',''], ['smoke shop',''], ['health care',''], ['orange juice',''],
          ['pit stop',''], ['traffic light',''], ['corner store',''], ['brick wall',''],
           ['wind shield',''], ['farm stand',''], ['force field',''], ['side walk',''],
            ['head light',''], ['mountain side',''], ['bell tower',''], ['brick oven',''],
             ['cobble stone',''], ['stained glass',''], ['bucket list',''], ['movie theater',''],
              ['double dip',''], ['cliff note',''], , ['peanut butter',''], ['dumb bell',''],
               ['boot camp',''], ['poison ivy',''], ['key board',''], ['phone call',''], ];

const word = wordToEmojiList[diff][0];
const emoji = wordToEmojiList[diff][1];

document.getElementById('emoji').innerText = emoji;

var wordBreak = word.split(" ");
var wordFirst = wordBreak[0];
var wordSecond = wordBreak[1];

//resetGameState();

const getData = async (callback) => {
    await fetch('https://dictionaryapi.com/api/v3/references/thesaurus/json/' + wordFirst + '?key=68e808fe-49bb-43fa-aa19-40a7da03ac6e')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        synListFirst = [];
        //console.log(data[0]["meta"]["syns"][0]);
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i]["meta"]["syns"].length; j++) {
                //console.log(data[i]["meta"]["syns"][j]);
                synListFirst = synListFirst.concat(data[i]["meta"]["syns"][j]);
            }
        }
        //console.log(synListFirst);
    })
    .catch();

    await fetch('https://dictionaryapi.com/api/v3/references/thesaurus/json/' + wordSecond + '?key=68e808fe-49bb-43fa-aa19-40a7da03ac6e')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        synListSecond = [];
        //console.log(data[0]["meta"]["syns"][0]);
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i]["meta"]["syns"].length; j++) {
                //console.log(data[i]["meta"]["syns"][j]);
                synListSecond = synListSecond.concat(data[i]["meta"]["syns"][j]);
            }
        }
        //console.log(synListSecond);
        callback();
    })
    .catch();
}

getData(loadLocalStorage);

function loadLocalStorage() {
    try {
        guessedWords = JSON.parse(window.localStorage.getItem('guessedWords'));
    } catch (err) {
        console.log('no guessed words');
    }
    
    row = Number(window.localStorage.getItem('row')) || row;

    day = window.localStorage.getItem('day') || currDate;

    gamesPlayed = Number(window.localStorage.getItem('gamesPlayed')) || gamesPlayed;

    gamesWonOne = Number(window.localStorage.getItem('gamesWonOne')) || gamesWonOne;
    gamesWonTwo = Number(window.localStorage.getItem('gamesWonTwo')) || gamesWonTwo;
    gamesWonThree = Number(window.localStorage.getItem('gamesWonThree')) || gamesWonThree;
    gamesWonFour = Number(window.localStorage.getItem('gamesWonFour')) || gamesWonFour;

    currentStreak = Number(window.localStorage.getItem('currentStreak')) || currentStreak;
    highestStreak = Number(window.localStorage.getItem('highestStreak')) || highestStreak;

    checkForReset();

    console.log(gamesPlayed);
    console.log(gamesWonOne);
    console.log(gamesWonTwo );
    console.log(gamesWonThree);
    console.log(gamesWonFour);

    if (row != 0) {
        for (let i = 0; i < row; i++) {
            const guessFirstLoc = guessedWords[i][0].toLowerCase();
            const guessSecondLoc = guessedWords[i][1].toLowerCase();

            const guessDiv = document.createElement("div");
            guessDiv.classList.add("guess");
    
            const guessItemLeft = document.createElement("div");
            guessItemLeft.classList.add("guess-item-div-left");
    
            const guessItemRight = document.createElement("div");
            guessItemRight.classList.add("guess-item-div-right");
    
            newGuessLeft = document.createElement("li");
            newGuessRight = document.createElement("li");
            
            newGuessLeft.innerText = guessFirstLoc;
            newGuessRight.innerText = guessSecondLoc;
    
            //newGuess.classList.add("guess-item");
            //guessDiv.appendChild(newGuess);
            guessDiv.appendChild(guessItemLeft);
            guessItemLeft.appendChild(newGuessLeft);
            guessDiv.appendChild(guessItemRight);
            guessItemRight.appendChild(newGuessRight);
            guessList.appendChild(guessDiv);
    
            var firstCorr = false;
            var secondCorr = false;
            // first word
            if (wordFirst == guessFirstLoc) {
                newGuessLeft.setAttribute('id','green');
                firstCorr = true;
                // make word green
            }
            else if (synListFirst.includes(guessFirstLoc)) {
                newGuessLeft.setAttribute('id','yellow');
                // make word yellow
            }
            else {
                newGuessLeft.setAttribute('id','black');
            }
        

            // second word

            if (wordSecond == guessSecondLoc) {
                newGuessRight.setAttribute('id','green');
                secondCorr = true;
                // make word green
            }
            else if (synListSecond.includes(guessSecondLoc)) {
                newGuessRight.setAttribute('id','yellow');
                // make word yellow
            }
            else {
                newGuessRight.setAttribute('id','black');
            }
            
            if (firstCorr && secondCorr) {
                gameOver = true;
                endGame();
            }
            firstCorr = false;
            secondCorr = false;

            if (row > 4) {
                console.log('error');
                gameOver = true;
                return;
            }
            
            // reset input box
            guessInput.value = '';
            if (row > 3) {
                gameOver = true;
                endGame();
            }
        }
        // for every row we have, run most of the submit process

        }
}

document.addEventListener("keyup", (e) => {
    if (gameOver) {
        return;
    }
    else if (e.code == "Enter") {
        if (checkGuess()) {
            submit();
        }
    }
})

function copyText()
{
    var shareText = document.getElementById("share-text");
    shareText.style.display='block';
    shareText.select();
    document.execCommand('copy');
    shareText.style.display='none';

}

function checkForReset(){
    if (day != currDate){
        resetGameState();
    }
}

function resetGameState() {
    window.localStorage.setItem('guessedWords', []);
    guessedWords = [];
    window.localStorage.setItem('row', 0);
    row = 0;
    window.localStorage.setItem('day', currDate);
    day = currDate;

    /*
    window.localStorage.setItem('gamesPlayed', 0);
    window.localStorage.setItem('gamesWonOne', 0);
    window.localStorage.setItem('gamesWonTwo', 0);
    window.localStorage.setItem('gamesWonThree', 0);
    window.localStorage.setItem('gamesWonFour', 0);
    window.localStorage.setItem('currentStreak', 0);
    window.localStorage.setItem('highestStreak', 0);
    */
}

function preserveGameState () {
    window.localStorage.setItem('guessedWords', JSON.stringify(guessedWords));
    window.localStorage.setItem('day', currDate);
}

function checkGuess() {
    guessText = guessInput.value
    guessBreak = guessText.split(" ");
    if (guessText.length == 0 || guessBreak.length != 2) {
        return false;
    }
    else {
        guessFirst = guessBreak[0].toLowerCase();
        guessSecond = guessBreak[1].toLowerCase();
        return true;
    }
}

function submit() {
    //event.preventDefault();
    // adjust list

    const guessDiv = document.createElement("div");
    guessDiv.classList.add("guess");

    const guessItemLeft = document.createElement("div");
    guessItemLeft.classList.add("guess-item-div-left");

    const guessItemRight = document.createElement("div");
    guessItemRight.classList.add("guess-item-div-right");

    newGuessLeft = document.createElement("li");
    newGuessRight = document.createElement("li");

    newGuessLeft.innerText = guessFirst;
    newGuessRight.innerText = guessSecond;

    //newGuess.classList.add("guess-item");
    //guessDiv.appendChild(newGuess);
    guessDiv.appendChild(guessItemLeft);
    guessItemLeft.appendChild(newGuessLeft);
    guessDiv.appendChild(guessItemRight);
    guessItemRight.appendChild(newGuessRight);
    guessList.appendChild(guessDiv);

    guessedWords = guessedWords.concat([guessBreak]);
    
    preserveGameState();

    row += 1;

    if (processGuess()){
        winResponse();
    } 
    else if (row > 3) {
        loseResponse();
    }

    // reset input box
    guessInput.value = '';
    window.localStorage.setItem('row', row);
    
    
}

function winResponse(){
    gameOver = true;
    
    if (row == 1){
        gamesWonOne += 1
        window.localStorage.setItem('gamesWonOne', gamesWonOne);
    }
    else if (row == 2){
        gamesWonTwo += 1
        window.localStorage.setItem('gamesWonTwo', gamesWonTwo);
    }
    else if (row == 3){
        gamesWonThree += 1
        window.localStorage.setItem('gamesWonThree', gamesWonThree);
    }
    else if (row == 4){
        gamesWonFour += 1
        window.localStorage.setItem('gamesWonFour', gamesWonFour);
    }

    gamesPlayed += 1;
    window.localStorage.setItem('gamesPlayed', gamesPlayed);
    currentStreak += 1;
    window.localStorage.setItem('currentStreak', currentStreak);
    endGame();
}

function loseResponse(){
    gameOver = true;
    gamesPlayed += 1;
    window.localStorage.setItem('gamesPlayed', gamesPlayed);
    currentStreak = 0;
    window.localStorage.setItem('currentStreak', currentStreak);
    endGame();
}

async function wait(func, seconds) {
    await new Promise(resolve => setTimeout(resolve, seconds * 1000));
    func();
  }

function endGame() {
    guessInput.remove();
    document.getElementById("answer").innerText = word;
    wait(showStats, 1.5);
}

function processGuess() {
    var firstCorr = false;
    var secondCorr = false;
    // first word
    if (wordFirst == guessFirst) {
        newGuessLeft.setAttribute('id','green');
        firstCorr = true;
        // make word green
    }
    else if (synListFirst.includes(guessFirst)) {
        newGuessLeft.setAttribute('id','yellow');
        // make word yellow
    }
    else {
        newGuessLeft.setAttribute('id','black');
    }
    // second word

    if (wordSecond == guessSecond) {
        newGuessRight.setAttribute('id','green');
        secondCorr = true;
        // make word green
    }
    else if (synListSecond.includes(guessSecond)) {
        newGuessRight.setAttribute('id','yellow');
        // make word yellow
    }
    else {
        newGuessRight.setAttribute('id','black');
    }

    if (firstCorr && secondCorr) {
        firstCorr = false;
        secondCorr = false;
        return true;
    }
    firstCorr = false;
    secondCorr = false;
    return false;
}

function showStats(){
    document.getElementById("stats-container").style.display="block"
    document.getElementById("overlay").style.display="block"
    document.getElementById("games-played").innerText = gamesPlayed;
    var winPercentage = Math.floor((gamesWonOne + gamesWonTwo + gamesWonThree + gamesWonFour)/gamesPlayed * 100);
    document.getElementById("win-percentage").innerText = winPercentage;
    document.getElementById("current-streak").innerText = currentStreak;
    if (currentStreak > highestStreak){
        highestStreak = currentStreak;
        window.localStorage.setItem('highestStreak', highestStreak);
    }
    document.getElementById("highest-streak").innerText = highestStreak;

    var avgGuess = Math.round(((1 * gamesWonOne) + (2 * gamesWonTwo) + (3 * gamesWonThree) + (4 * gamesWonFour)) /
     (gamesWonOne + gamesWonTwo + gamesWonThree + gamesWonFour))

    gScore = (((gamesWonOne + gamesWonTwo + gamesWonThree + gamesWonFour) * (winPercentage/100)) / avgGuess) * 3;
    gScore = Math.round((gScore + (gScore * (currentStreak / 100))) * 10) / 10;
    document.getElementById("gemoji-score").innerText = gScore;

    var highestWins = Math.max(gamesWonOne, gamesWonTwo, gamesWonThree, gamesWonFour);
    document.getElementById("guessOne").innerText = gamesWonOne;
    document.getElementById("guessOne").style.width = Math.round((gamesWonOne/highestWins) * 275) || 30;
    document.getElementById("guessTwo").innerText = gamesWonTwo;
    document.getElementById("guessTwo").style.width = Math.round((gamesWonTwo/highestWins) * 275) || 30;
    document.getElementById("guessThree").innerText = gamesWonThree;
    document.getElementById("guessThree").style.width = Math.round((gamesWonThree/highestWins) * 275) || 30;
    document.getElementById("guessFour").innerText = gamesWonFour;
    document.getElementById("guessFour").style.width = Math.round((gamesWonFour/highestWins) * 275) || 30;
    
    if (gameOver){
        document.getElementById("share-button").style.display = "block";
    }

    var date = currDate.toString();
    date = date.split(" ");
    date = date[1] + " " + date[2] + " " + date[3];

    var shareMessage = `Gemoji ${date}\n`
    shareMessage+=`${row}/4\n\n`
    for (let i = 0; i < row; i++){
        for (let j = 0; j < 2; j++){
            if (guessList.childNodes[i].childNodes[j].firstChild.id == 'green'){
                shareMessage+= "🟩";
            }
            else if (guessList.childNodes[i].childNodes[j].firstChild.id == 'yellow'){
                shareMessage+= "🟨";
            }
            else if (guessList.childNodes[i].childNodes[j].firstChild.id == 'black'){
                shareMessage+= "⬛";
            }
            if (j == 1){
                shareMessage+= "\n";
            }
        }
    }

    document.getElementById("share-text").value = shareMessage
}

function showInfo(){
    document.getElementById("info-container").style.display="block"
    document.getElementById("overlay").style.display="block"
}

function hideStats(){
    document.getElementById("stats-container").style.display="none"
    document.getElementById("overlay").style.display="none"
}

function hideInfo(){
    document.getElementById("info-container").style.display="none"
    document.getElementById("overlay").style.display="none"
}

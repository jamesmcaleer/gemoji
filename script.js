const guessInput = document.querySelector(".guess-input");
const guessList = document.querySelector(".guesses");
//const apiKey = process.env.API_KEY;

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

const wordToEmojiList = [
    ["hand shake", "✋🥤"],
    ['dragon fruit','🐲🍉'],
    ['stone cold','🗿🥶'],
    ['fishing pole','🐟🦯'],
    ['high tide','👋🌊'],
    ['ski lift','⛷️🏋️‍♂️'],
    ['cart wheel','🛒🚗'],
    ['face book','😀📕'],
    ['cow boy','🐮👦'],
    ['moon walk','🌕🚶‍♂️'],
    ['good point','👍❗'],
    ['sand castle','🏖️🏰'],
    ['bucket list','🗑️📜'],
    ['gift card','🎁🃏'],
    ['road rage','🛣️😡'],
    ['stop sign','✋⚠️'],
    ["tooth brush", "🦷🖌️"],
    ["mail box", "✉️📦"],
    ["rain coat", "💧🧥"],
    ["cup cake", "🧁🍰"],
    ['key board','🔑🛹'],
    ['dinner time','🍲⏰'],
    ['head phones','💆‍♂️📞'],
    ['traffic light','🛣️💡'],
    ['family tree','👪🌲'],
    ["fire fighter", "🔥🥊"],
    ["bed room", "🛏️🏠"],
    ["wheel chair", "🚗🪑"],
    ['fight club', '🥊♣️'],
    ['rain forest', '💧🌲'],
    ['pool noodle', '🏊🍜'],
    ['stair case', '👀💼'],
    ['swim meet', '🏊🥩'],
    ['dumb bell', '😵‍💫🔔'],
    ['book mark', '📕❌'],
    ['massage gun', '💆‍♂️🔫'],
    ["snow man", "🌨️👤"],
    ["fish bowl", "🐟🥣"],
    ["global warming", "🌍🔥"],
    ["wind mill", "💨🏰"],
    ["cup board", "🥤🛹"],
    ["rain drop", "💧☔"],
    ["brain storm", "🧠🌩️"],
    ["sea shell", "🌊🐚"],
    ["suit case", "🕴️💼"],
    ["back pack", "🔙🧳"],
    ["rail road", "🚆🛣️"],
    ["bird house", "🐦🏠"],
    ["hot dog", "🔥🐶"],
    ["light house", "💡🏠"],
    ['golf club','🏌️‍♂️♣️'],
    ["water fall", "💧🍂"],
    ["rain bow", "💧🏹"],
    ["moon light", "🌕💡"],
    ["beach ball", "🏖️🏀"],
    ["milk shake", "🥛🥤"],
    ["pan cake", "🍳🎂"],
    ['fire man', '🔥👨'],
    ['water park','🌊🎢'],
    ['red light','🟥☀️'],
    ['flower pot','🌻🍲'],
    ['sweat shirt','💦👕'],
    ['play list','🤾‍♂️📜']
    ["tea pot", "🍵🍶"],
    ['home work','🏠💼'],
    ['wind shield','💨🛡️'],
    ['corner store','📐🏬'],
    ['boot camp','🥾🏕️'],
    ['peanut butter','🥜🧈'],
    ['pit stop','🕳️🛑'],
    ['photo graph','📷📈'],
    ['new jersey','🆕🎽'],
    ['web page','🕸️📃'],
    ['air head','💨🧑'],
    ['toy drive','🧸🚗'],
    ['drama queen','🎭👑'],
    ['time line','⏱️📉'],
    ['high school','☝️🏫'],
    ['food fight','🍲🥊'],
    ['train wreck','🚂💔'],
    ['holly wood','🎅🪵'],
    ['bikini bottom','👙🍑']
];

const word = wordToEmojiList[diff][0];
const emoji = wordToEmojiList[diff][1];

document.getElementById('emoji').innerText = emoji;

var wordBreak = word.split(" ");
var wordFirst = wordBreak[0];
var wordSecond = wordBreak[1];


//resetGameState();

async function fetchEnvVars() {
  try {
    const response = await fetch('/.netlify/functions/getApiKey');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching environment variables:', error);
    throw error; // Rethrow the error to handle it outside this function if needed
  }
}
const getData = async (callback) => {
    const data = await fetchEnvVars();
    const apiKey = data.apiKey;
    await fetch('https://api.api-ninjas.com/v1/thesaurus?word=' + wordFirst, 
    {headers: { 'X-Api-Key': apiKey}}) // 'qES39P3zb/DiJ6lltMJhfw==lkt9C2EiF2GPS7W6'
    .then((response) => {
        //console.log(response)
        return response.json();
    })
    .then((data) => {
        synListFirst = [];
        //console.log(data);
        //console.log(data[0]["meta"]["syns"][0]);
        for (let i = 0; i < data["synonyms"].length; i++){
            synListFirst = synListFirst.concat(data["synonyms"][i])
        }
        console.log(synListFirst)
        
    })
    .catch();

    await fetch('https://api.api-ninjas.com/v1/thesaurus?word=' + wordSecond, 
    {headers: { 'X-Api-Key': apiKey}})
    .then((response) => {
        //console.log(response)
        return response.json();
    })
    .then((data) => {
        synListSecond = [];
        //console.log(data);
        //console.log(data[0]["meta"]["syns"][0]);
        for (let i = 0; i < data["synonyms"].length; i++){
            synListSecond = synListSecond.concat(data["synonyms"][i])
        }
        console.log(synListSecond)
        callback();
        
        
    })
    .catch();
}

getData(loadLocalStorage);

function loadLocalStorage() {
    try {
        guessedWords = JSON.parse(window.localStorage.getItem('guessedWords'));
        if (guessedWords === null){
          guessedWords = []
        }
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
    console.log(gamesWonTwo);
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
            else if (synListFirst.includes(guessFirstLoc) || guessFirstLoc.includes(wordFirst) || wordFirst.includes(guessFirstLoc)) {
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
            else if (synListSecond.includes(guessSecondLoc) || guessSecondLoc.includes(wordSecond) || wordSecond.includes(guessSecondLoc)) {
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
            document.getElementById('attempt').innerText = "Attempt: " + (row + 1) + "/4";
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
        checkGuess();
    }
})

function copyText()
{
    var shareText = document.getElementById("share-text");
    shareText.style.display='block';
    shareText.select();
    document.execCommand('copy');
    shareText.style.display='none';
    document.getElementById("copied").style.display="block";
    wait(hideCopied, 3);
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
    guessText = guessInput.value.trim();
    guessBreak = guessText.split(/\s+/);
    console.log(guessBreak);
    if (guessBreak.length == 2) {
        guessFirst = guessBreak[0].toLowerCase();
        guessSecond = guessBreak[1].toLowerCase();
        submit();
    }
    else {
        document.getElementById("wrong").style.display="block";
        wait(hideWrong, 3);
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
    document.getElementById('attempt').innerText = "Attempt: " + (row + 1) + "/4";
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
    document.getElementById("submit").style.display="none";
    document.getElementById("attempt").style.display="none";
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
    else if (synListFirst.includes(guessFirst) || guessFirst.includes(wordFirst) || wordFirst.includes(guessFirst)) {
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
    else if (synListSecond.includes(guessSecond) || guessSecond.includes(wordSecond) || wordSecond.includes(guessSecond)) {
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
    shareMessage += "https://gemoji.netlify.app/";
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

function hideCopied(){
    document.getElementById("copied").style.display="none";
}

function hideWrong(){
    document.getElementById("wrong").style.display="none";
}

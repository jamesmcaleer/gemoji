# Gemoji
Guess the **compound** word given two emojis

## Play Gemoji
To play **Gemoji**, click [here](https://gemoji.netlify.app)

## What is Gemoji?
**Gemoji** is a daily refreshing web game similar to Wordle

The player is given four tries to guess the **compound** word

## Example
The emojis given are 🏠💼

The answer is home work because the house emoji represents a **home** and the briefcase emoji in this given context represents **work**

If the player guesses a synonym to one of these words, it will show up yellow hinting to the player that they are on the right track

## How it works
Upon starting the game, the [Thesaurus API](https://api-ninjas.com/api/thesaurus) is used to find all synonyms of both target words

For example, **home** would have synonyms such as house and place

Whenever the player inputs a word, this word is checked against synList to see if it is a synonym:

```javascript
const getData = async (callback) => {
    // returns json file of dictionary api synonyms for the word
    await fetch('https://dictionaryapi.com/api/v3/references/thesaurus/json/' + word + '?key=notshown')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // creates an empty array of synonyms
        synList = [];
        // goes through each synonym of the json file
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i]["meta"]["syns"].length; j++) {
                // appends each synonym to the array of synonyms
                synList = synListFirst.concat(data[i]["meta"]["syns"][j]);
            }
        }
        
    })
    .catch()
```

Just like in Wordle, the players data is saved

This includes the words that they had previously guessed that day, the amount of wins the player has, the amount of games the player has played, and the streak the player is on

This is all saved in the local storage of the browser so retrieving this data is simple:

```javascript
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
```





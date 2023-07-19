# Gemogi
Guess the **compound** word given two emojis
## What is Gemoji?
**Gemoji** is a daily refreshing web game similar to Wordle

The player is given four tries to guess the **compound** word
## Example
The emojis given are 🏠💼

The answer is home work because the house emoji represents a **home** and the briefcase emoji in this given context represents **work**

If the player guesses a synonym to one of these words, it will show up yellow hinting to the player that they are on the right track.

## How it works
Upon starting the game, the [Dictionary API](https://dictionaryapi.com) is used to find all synonyms of both target words

For example, **home** would have synonyms such as house and place.

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

## Play Gemoji
To play Gemoji, click [here](https://jamesmcaleer.github.io/gemoji/)

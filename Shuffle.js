/**
 *   @author Daniel King
 *   @version 0.0.3
 *   @summary Project Final || created: 12.14.2018
 */

"use strict";
const PROMPT = require('readline-sync');
const IO = require('fs');  // For file I/O

let deckOne=[];//deckOne is where it starts and ends. two and three are temps
function main(){
    console.log('Welcome to the deck shuffler');
    let select=Number(PROMPT.question('Are you loading a deck or getting a new one? Press [1] to load, Press [2] for a new deck '));
    while(select!==1&&select!==2){
        console.log('invalid entry');
        select=Number(PROMPT.question('Are you loading a deck or getting a new one? Press [1] to load, Press [2] for a new deck '));
    }
    if (select===1){
        loadDeck();
    }
    else{
        newDeck();
    }
    select=Number(PROMPT.question('Do you want to shuffle the deck? Press [1] for yes, Press [0] for no '));
    while(select!==1&&select!==0){
        console.log('invalid entry');
        select=Number(PROMPT.question('Do you want to shuffle this deck? Press [1] for yes, Press [0] for no '));
    }
    while (select===1) {
        shuffle();
        select=Number(PROMPT.question('Again? Press [1] for yes, Press [0] for no '));
    }
    select=Number(PROMPT.question('Do you want to look at the deck? Press [1] for yes, Press [0] for no '));
    while(select!==1&&select!==0){
        console.log('invalid entry');
        select=Number(PROMPT.question('Do you want to look at the deck? Press [1] for yes, Press [0] for no '));
    }
    if (select===1) {
        console.log(deckOne);
    }
    select=Number(PROMPT.question('Do you want to save this deck? Press [1] for yes, Press [0] for no '));
    while(select!==1&&select!==0){
        console.log('invalid entry');
        select=Number(PROMPT.question('Do you want to save this deck? Press [1] for yes, Press [0] for no '));
    }
    if (select===1) {
        saveDeck();
    }
    console.log('thank you!')
}
main();
/**
 * @method
 * @desc populates deckOne[][]
 * @returns {null}
 */
function newDeck() {
    for (let i = 1; i < 53; i++) {
        deckOne.push([]);
        if (i < 14) {
            deckOne[i - 1][0] = 'diamonds';
            deckOne[i - 1][1] = i;
        }
        else if (i < 27) {
            deckOne[i - 1][0] = 'hearts';
            deckOne[i - 1][1] = i - 13;
        }
        else if (i < 40) {
            deckOne[i - 1][0] = 'clubs';
            deckOne[i - 1][1] = i - 26;
        }
        else {
            deckOne[i - 1][0] = 'spades';
            deckOne[i - 1][1] = i - 39;
        }
    }
}

/**
 * @method
 * @desc deckOne[][] I/O mutator
 * @returns {null}
 */
function loadDeck() {
    let savedDeck = IO.readFileSync(`data/deck.csv`, 'utf8');
    let lines = savedDeck.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        deckOne.push(lines[i].toString().split(/,/));
    }
    console.log(deckOne);
}
/**
 * @method
 * @desc deckOne[][] mutator
 * @returns {null}
 */
function shuffle() {
    let deckTwo=[],deckThree=[];
    for (let i = 0; i < 5; i++) {
        while (deckOne.length > deckTwo.length) {
            deckTwo.push(deckOne.pop());
        }
        while (deckTwo.length > 0 || deckOne.length > 0) {
            if (Math.floor(Math.random() * 10) > 5) {
                deckThree.push(deckOne.pop());
                deckThree.push(deckTwo.pop())
            }
            else {
                deckThree.push(deckTwo.pop());
                deckThree.push(deckOne.pop())
            }
        }
        while (deckThree.length > 0) {
            deckOne.push(deckThree.pop());
        }
    }
}
/**
 * @method
 * @desc saves deckOne[][] to disk file
 * @returns {null}
 */
function saveDeck() {
    const COLUMNS = 2;
    for (let i = 0; i < deckOne.length; i++) {
        if (deckOne[i]) {
            for (let j = 0; j < COLUMNS; j++) {
                if (j < COLUMNS - 1) {
                    IO.appendFileSync(`data/dataX.csv`, `${deckOne[i][j]},`);
                } else if (i < deckOne.length - 1) {
                    IO.appendFileSync(`data/dataX.csv`, `${deckOne[i][j]}\n`);
                } else {
                    IO.appendFileSync(`data/dataX.csv`, `${deckOne[i][j]}`);
                }
            }
        }
    }
    IO.unlinkSync(`data/deck.csv`);
    IO.renameSync(`data/dataX.csv`, `data/deck.csv`);
}
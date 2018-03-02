# The Office Trivia Game

Week 5 Assignment: Create a simple trivia game using JavaScript and jQuery

## Description

[The Office Trivia Game](https://xandromus.github.io/triviagame/)

![The Office Trivia Game](https://xandromus.github.io/responsive-portfolio/assets/images/office.png)

A trivia game based on the NBC TV show The Office. All characters, music, and the name The Office are copyright NBC.

The user is presented with ten trivia questions based on characters and situations from The Office. The questions and answers are in a different order each time the game is played. The user has ten seconds to choose an answer, represented by a timer at the top of the page.

If the user chooses a correct answer, a corresponding message appears, and the image representing the question changes to one representing the answer. The correct answer list item highlights in green and the timer stops before moving to the next question after a few seconds. The tally for correct answers increases by one.

There is a similar change if the user chooses incorrectly, but the correct answer is shown in the display, and both the correct answer and the incorrect user choice list items are highlighted (the latter in red). The tally for incorrect answers increases by one.

If the user does not make a choice before the timer reaches zero, the correct answer is displayed and the correct answer list item is highlighted in green. This counts as an incorrect answer.

At the end of the ten questions, the user is given the option to view their results. The tallies are displayed, and one of three corresponding pictures and messages is shown depending on how many answers were correct. The user then has the option to restart the game and is taken back to the beginning screen.

The theme music plays every time the Dundie icon is clicked, but it only plays once (no looping). There is no option to toggle the music on and off, as it does not loop and only plays with user input.

## Concepts Used

This trivia game builds on the JavaScript and jQuery concepts from previous weeks by adding some important methods:

- `setTimeout`
- `setInterval`
- `clearInterval`

The use of functions within an object was also important to this project. The code for shuffling the questions and answers was taken directly from a Stack Overflow answer.

## Built With

- Sublime Text - Text Editor
- Git Bash

## Authors

- **Xander Rapstine** - [Xander Rapstine](https://github.com/Xandromus)
- **NBC** - [BioWare](https://www.nbc.com/)
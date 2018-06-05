
function wrongGuessCount(word, guesses) {
  // function that takes a word, and an array of guessed letters,
  // and returns count of failed guesses.

  /*
  // filter the guesses array by picking the guessed letters that
  // are not in the word
  const result = guesses.filter(guess => word.indexOf(guess)=== -1)
  // the result array will have the wrong guessed letters
  // return the length of this array
  return result.length
  */
  // short hand of the above
  return guesses.filter(guess => word.indexOf(guess)=== -1).length
}

console.log('test wrong guesses: ', wrongGuessCount('hello', ['e', 'd', 'x', 'o']) === 2)

function showGuess(word, guesses) {
  // Split word into an array of letters
  const wordLetters = word.split('')
  // Use the map function going over the wordLetters array
  // map the letter of the word if it is not in the guesses array
  // (using the wrongGuessCount function) otherwise map an _
  const result = wordLetters.map(function(letter) {
    if (wrongGuessCount(letter,guesses)===guesses.length) return '_'
    else return letter
  })
  // return the resulted array as a string with space as separator
  return result.join(' ')
}

console.log('test show guess 1:', showGuess('hello', ['l']) === '_ _ l l _')
console.log('test show guess 2:', showGuess('hello', ['l', 'a', 'e']) === '_ e l l _')

function isWinner(word, guesses) {
  // Call showGuess to get the guess result
  const showGuessResult = showGuess(word,guesses)
  // Remove the spaces from the string with the replace method
  const guessWord = showGuessResult.replace(/ /gi,'')
  //console.log(guessWord)
  // Return the result of the comparison of word with the guessed word
  return word === guessWord
}

console.log('test winner 1:', !isWinner('hello', ['e', 'x']))
console.log('test winner 2:', isWinner('hello', ['o', 'l', 'e', 'h']))

// to read from the console
const readline = require('readline')
const rl = readline.createInterface({input:process.stdin, output:process.stdout})

function next(word, guesses) {
    // Show the current guess result
    console.log('Guess result: ' + showGuess(word, guesses))
    // check if lost
    if (wrongGuessCount(word, guesses) > 5) {console.log('you loose'); return 'you have lost'}
    // check if won
    if (isWinner(word, guesses)) {console.log('you win');return 'you have won'}
    // ask for the next letter
    rl.question('next letter? ', answer => {
        console.log('player wrote:', answer)
        // Add the new guessed letter to the guesses array, with leading
        // spaces removed and call the next function again
        const guessesNew=guesses.concat(answer.trim()[0])
        console.log('Guessed letters are: ' + guessesNew)
        next(word,guessesNew)
    })
}

console.log(next('hello', []))

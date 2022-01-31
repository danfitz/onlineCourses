import React from 'react'
import PropTypes from 'prop-types'

const GuessedWords = ({ guessedWords }) => {
  return (
    <div data-test='guessedWordsComponent'>
      { guessedWords.length ? (
        <div data-test='guessedWordsNode'>
          <h2>Guessed Words</h2>
          <table className='table table-sm'>
            <thead className='thead-light'>
              <tr>
                <th>Guess</th>
                <th>Matching Letters</th>
              </tr>
            </thead>
            <tbody>
              { guessedWords.map((word, index) => (
                <tr data-test='guessedWordNode' key={index}>
                  <td>{word.guessedWord}</td>
                  <td>{word.letterMatchCount}</td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      ) : (
        <span data-test='instructions'>
          Try to guess the secret word
        </span>
      ) } 
    </div>
  )
}

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired
    })
  ).isRequired
}

export default GuessedWords
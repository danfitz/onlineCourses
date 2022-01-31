import React, { Component } from 'react'
import Congrats from './Congrats'
import GuessedWords from './GuessedWords'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className='container'>
        <h1>Jotto</h1>
        <Congrats success={false} />
        <GuessedWords guessedWords={[
          { guessedWord: 'train', letterMatchCount: 3 },
          { guessedWord: 'agile', letterMatchCount: 1 },
          { guessedWord: 'party', letterMatchCount: 5 }
        ]} />
      </div>
    )
  }
}

export default App
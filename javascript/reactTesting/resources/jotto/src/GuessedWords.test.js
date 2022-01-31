// Modules
import React from 'react'
import { shallow } from 'enzyme'
// Components
import GuessedWords from './GuessedWords'
// Utils
import { findByTestAttr, checkProps } from '../test/testUtils'

const defaultProps = {
  guessedWords: [
    { guessedWord: 'pluck', letterMatchCount: 4 },
    { guessedWord: 'black', letterMatchCount: 3 }
  ]
}

const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props }
  return shallow(<GuessedWords {...setupProps} />)
}

test('does not throw propTypes error with expected props', () => {
  checkProps(GuessedWords, defaultProps)
})

describe('if there are no words guessed', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] })
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'guessedWordsComponent')
    expect(component.length).toBe(1)
  })

  test('renders instructions to guess a word', () => {
    const instructions = findByTestAttr(wrapper, 'instructions')
    expect(instructions.text().length).toBeGreaterThan(0)
  })
})

describe('if there are words guessed', () => {
  const guessedWords = [
    { guessedWord: 'train', letterMatchCount: 3 },
    { guessedWord: 'agile', letterMatchCount: 1 },
    { guessedWord: 'party', letterMatchCount: 5 }
  ]
  let wrapper
  beforeEach(() => {
    wrapper = setup({ guessedWords })
  })

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'guessedWordsComponent')
    expect(component.length).toBe(1)
  })

  test('renders list of already guessed words', () => {
    const guessedWordsNode = findByTestAttr(wrapper, 'guessedWordsNode')
    expect(guessedWordsNode.length).toBe(1)
  })

  test('displays correct number of guessed words', () => {
    const guessedWordNodes = findByTestAttr(wrapper, 'guessedWordNode')
    expect(guessedWordNodes.length).toBe(guessedWords.length)
  })
})
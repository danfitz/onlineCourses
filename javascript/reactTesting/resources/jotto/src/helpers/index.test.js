import { getLetterMatchCount } from './'

describe('getLetterMatchCount', () => {
  const secretWord = 'party'

  test('returns correct count when there are NO matching letters', () => {
    const guessedWord = 'hello'
    const letterCount = getLetterMatchCount(guessedWord, secretWord)
    expect(letterCount).toBe(0)
  })
  test('returns correct count when there are 3 matching letters', () => {
    const guessedWord = 'train'
    const letterCount = getLetterMatchCount(guessedWord, secretWord)
    expect(letterCount).toBe(3)
  })
  test('returns correct count when there are DUPLICATE matching letters', () => {
    const guessedWord = 'parry'
    const letterCount = getLetterMatchCount(guessedWord, secretWord)
    expect(letterCount).toBe(4)
  })
})
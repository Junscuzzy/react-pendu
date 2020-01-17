import React, { useReducer } from 'react'
import { Button, Typography, makeStyles } from '@material-ui/core'

import theme from './theme'
import { letters } from './data.json'
import { computeDisplay, normalizeString, countUnderscore } from './utils'
import EndOfGameModal from './EndOfGameModal'

const useStyles = makeStyles({
    keyboard: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    keyTouch: {
        margin: theme.spacing(0.5),
    },
    word: {
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
    },
})

interface GameProps {
    word: string
    onEndGame: (win: boolean) => void
}

interface GameState {
    usedLetters: string[]
    failCount: number
}

type Action = {
    type: 'SET_FAIL' | 'ADD_LETTER'
    letter?: string
}

const Game = ({ word: originalWord, onEndGame }: GameProps) => {
    const classes = useStyles()
    const word = normalizeString(originalWord)
    const initialState: GameState = {
        usedLetters: ['-', ' ', "'"],
        failCount: 0,
    }
    const [states, dispatch] = useReducer(
        (state: GameState, action: Action) => {
            switch (action.type) {
                case 'SET_FAIL':
                    return { ...state, failCount: state.failCount + 1 }
                case 'ADD_LETTER':
                    return action.letter
                        ? {
                              ...state,
                              usedLetters: [
                                  ...state.usedLetters,
                                  action.letter,
                              ],
                          }
                        : state

                default:
                    return state
            }
        },
        initialState,
    )

    const hiddenWord = computeDisplay(word, states.usedLetters)
    const hiddenLettersCount = countUnderscore(hiddenWord)
    const endOfGame = states.failCount >= 10
    const win = hiddenLettersCount === 0 && !endOfGame

    function handleClick(letter: string): void {
        dispatch({ type: 'ADD_LETTER', letter })

        if (!word.split('').includes(letter)) {
            dispatch({ type: 'SET_FAIL' })
        }
    }

    const endOfGameProps = {
        win,
        word: originalWord,
        onClose: () => onEndGame(win),
    }

    return (
        <>
            {endOfGame && <EndOfGameModal {...endOfGameProps} />}
            {win && <EndOfGameModal {...endOfGameProps} />}

            <div className={classes.keyboard}>
                {letters.map(letter => (
                    <Button
                        key={letter}
                        variant="outlined"
                        color="primary"
                        size="small"
                        disabled={states.usedLetters.includes(letter)}
                        onClick={(): void => handleClick(letter)}
                        className={classes.keyTouch}
                    >
                        {letter}
                    </Button>
                ))}
            </div>

            <Typography variant="h4" className={classes.word}>
                {hiddenWord}
            </Typography>
        </>
    )
}

export default Game

import React, { useEffect } from 'react'
import { Button, makeStyles } from '@material-ui/core'

import { letters } from './data.json'

const useStyles = makeStyles(theme => ({
    keyboard: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
        maxWidth: '960px',
    },
    keyTouch: {
        margin: theme.spacing(0.5),
    },
}))

interface KeyTouchProps {
    usedLetters: string[]
    letter: string
    onKeyPress: () => void
}

function KeyTouch({ letter, usedLetters, onKeyPress }: KeyTouchProps) {
    const classes = useStyles()

    function downHandler({ key }: { key: string }) {
        if (key === letter) {
            onKeyPress()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', downHandler)
        return () => {
            window.removeEventListener('keydown', downHandler)
        }
    }, [])

    return (
        <Button
            key={letter}
            variant="outlined"
            color="primary"
            size="small"
            disabled={usedLetters.includes(letter)}
            className={classes.keyTouch}
        >
            {letter}
        </Button>
    )
}

interface KeyboardProps {
    usedLetters: string[]
    onSelectLetter: (letter: string) => void
}

function Keyboard({ usedLetters, onSelectLetter }: KeyboardProps) {
    const classes = useStyles()
    return (
        <div className={classes.keyboard}>
            {letters.map(letter => (
                <span key={letter} onClick={(): void => onSelectLetter(letter)}>
                    <KeyTouch
                        letter={letter}
                        usedLetters={usedLetters}
                        onKeyPress={(): void => onSelectLetter(letter)}
                    />
                </span>
            ))}
        </div>
    )
}

export default Keyboard

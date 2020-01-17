import React, { useState } from 'react'
import { Button, Typography, makeStyles } from '@material-ui/core'

import theme from './theme'
import { letters } from './data.json'
import { computeDisplay, normalizeString, countUnderscore } from './utils'

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

// Todo : Rendre les lettres clickée différenciées ?
const Game = ({ word: originalWord }: { word: string }) => {
    const classes = useStyles()
    const word = normalizeString(originalWord)
    const possibleCharts = ['-', ' ', "'"]

    // Todo: il y a 2 "useState" => Refactor to reducer
    const [usedLetters, setLetter] = useState(possibleCharts)
    const [tryCount, setTry] = useState(0)
    const hiddenWord = computeDisplay(word, usedLetters)
    const restCount = countUnderscore(hiddenWord)

    function handleClick(letter: string): void {
        setTry(tryCount + 1)
        if (letter.length === 1 && !usedLetters.includes(letter)) {
            setLetter([...usedLetters, letter])
        }
    }

    // Game logic (Can try 10 times)
    // Todo : ouvrir un popup pour jouer une nouvelle partie
    // Todo : Sur session cookie, compter le nombre de victoires consécutives
    // Todo : Ajouter le SearchLien dans le message de reponse
    if (restCount === 0) {
        alert('You win!')
    }
    // ? Ajuster si la taille du mot est longue (déjà qu'ils sont dur)
    if (tryCount > 9) {
        alert('You loose')
    }

    // Todo : Transformer ça en stats de jeux
    console.log({
        originalWord,
        word,
        usedLetters,
        hiddenWord,
        restCount,
        tryCount,
    })

    return (
        <>
            <div className={classes.keyboard}>
                {letters.map(letter => (
                    <Button
                        key={letter}
                        variant="outlined"
                        color="primary"
                        size="small"
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

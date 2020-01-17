/**
 * NOTE
 *
 * @link Inspiration => http://jeudupendu.fr/
 * @link Wikipédia => https://www.wikiwand.com/fr/Le_Pendu_(jeu)
 * @link Cours OC => https://openclassrooms.com/fr/courses/4664381-realisez-une-application-web-avec-react-js/6734471-entrainez-vous-en-creant-un-jeu-du-pendu
 */

import React, { useReducer } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import {
    Container,
    Paper,
    Typography,
    CssBaseline,
    makeStyles,
} from '@material-ui/core'

import theme from './theme'
import { words } from './data.json'
import { getRandomWord } from './utils'
import Game from './Game'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(4),
    },
})

interface State {
    word: string
    wordsHistory: string[]
}
interface Action {
    type: 'RESET'
    word?: string
}

// ? Counting consecutive wins ?
const App: React.FC = () => {
    const classes = useStyles()
    const title = 'Le jeu du pendu'
    const initialState: State = {
        word: getRandomWord(words),
        wordsHistory: [],
    }
    const [states, dispatch] = useReducer((state: State, action: Action) => {
        switch (action.type) {
            case 'RESET':
                return action.word
                    ? {
                          ...state,
                          word: action.word,
                          wordsHistory: [...state.wordsHistory, action.word],
                      }
                    : state
            default:
                return state
        }
    }, initialState)

    // Arrow func for bind
    const restart = (): void => {
        const inHistory = states.wordsHistory.includes(states.word)
        let newWord: string = states.word

        while (newWord === states.word || inHistory) {
            newWord = getRandomWord(words)
        }
        dispatch({ type: 'RESET', word: newWord })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container className={classes.container}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h2">
                        {title}
                    </Typography>

                    <Game word={states.word} onEndGame={restart} />
                </Paper>
            </Container>
        </ThemeProvider>
    )
}

export default App

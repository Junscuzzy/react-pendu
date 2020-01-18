/**
 * NOTE
 *
 * @link Inspiration => http://jeudupendu.fr/
 * @link Wikipédia => https://www.wikiwand.com/fr/Le_Pendu_(jeu)
 * @link Cours OC => https://openclassrooms.com/fr/courses/4664381-realisez-une-application-web-avec-react-js/6734471-entrainez-vous-en-creant-un-jeu-du-pendu
 */

import React, { useReducer } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { CssBaseline, makeStyles } from '@material-ui/core'

import theme from './theme'
import { words } from './data.json'
import { getRandomItem } from './utils'
import Game from './Game'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
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
    word: string
}

const App: React.FC = () => {
    const classes = useStyles()
    const initialState: State = {
        word: getRandomItem(words),
        wordsHistory: [],
    }
    const [{ word, wordsHistory }, dispatch] = useReducer(
        (state: State, action: Action) => {
            switch (action.type) {
                case 'RESET':
                    return {
                        ...state,
                        word: action.word,
                        wordsHistory: [...state.wordsHistory, action.word],
                    }
                default:
                    return state
            }
        },
        initialState,
    )

    // Arrow func for bind
    const restart = (): void => {
        let newWord: string = word
        while (newWord === word || wordsHistory.includes(newWord)) {
            newWord = getRandomItem(words)
        }
        dispatch({ type: 'RESET', word: newWord })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container className={classes.container}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h2" gutterBottom>
                        Le jeu du pendu
                    </Typography>
                    <Typography>
                        Essaye de trouver le mot caché.
                        <br />
                        {`Vous avez le droit à
                        10 erreurs avant que le jeu ne s'arrête.`}
                        <br />
                        Bonne chance !
                    </Typography>

                    <Game word={word} onEndGame={restart} />
                </Paper>
            </Container>
        </ThemeProvider>
    )
}

export default App

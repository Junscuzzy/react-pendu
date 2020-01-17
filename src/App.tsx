/**
 * NOTE
 *
 * @link Inspiration => http://jeudupendu.fr/
 * @link Wikipédia => https://www.wikiwand.com/fr/Le_Pendu_(jeu)
 * @link Cours OC => https://openclassrooms.com/fr/courses/4664381-realisez-une-application-web-avec-react-js/6734471-entrainez-vous-en-creant-un-jeu-du-pendu
 *
 * Todo : Commencer par relire l'énoncé :)
 */

import React from 'react'
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
// import SearchLink from './SearchLink'

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

const App: React.FC = () => {
    const classes = useStyles()
    const title = 'Le jeu du pendu'

    // Todo : Transform en reducer pour ajouter
    // Todo 1) OnGameEnd => trouver un nouveau mot
    // Todo 2) Compter les victoires consécutives
    const word = getRandomWord(words)

    return (
        <ThemeProvider theme={theme}>
            <Container className={classes.container}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h2">
                        {title}
                    </Typography>

                    <Game word={word} />
                </Paper>
            </Container>
        </ThemeProvider>
    )
}

export default App

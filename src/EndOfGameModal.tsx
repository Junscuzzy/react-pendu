import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { getSearchURL } from './utils'

interface ModalProps {
    win: boolean
    word: string
    onClose: () => void
    isOpen?: boolean
}

function EndOfGameModal({ win, word, onClose, isOpen = true }: ModalProps) {
    const [open, setOpen] = useState(isOpen)

    const handleClose = (): void => {
        setOpen(false)
    }
    const handleExited = (): void => {
        onClose()
    }

    return (
        <Container maxWidth="md">
            <Dialog
                open={open}
                onClose={handleClose}
                onExited={handleExited}
                fullWidth
                maxWidth={'sm'}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {win ? 'Bravo ! Vous avez gagné' : 'Game Over :('}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"
                        color="primary"
                    >
                        Le mot était {win && 'bien '}
                        <b>{word}</b>.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Link
                        href={getSearchURL(word)}
                        target="_blank"
                        style={{ marginRight: '.5em' }}
                    >
                        Voir la définition
                    </Link>
                    <Button
                        onClick={handleClose}
                        color="primary"
                        variant="contained"
                        autoFocus
                    >
                        {win ? 'Re-jouer' : 'Réessayer'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default EndOfGameModal

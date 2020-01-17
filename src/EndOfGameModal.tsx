import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
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
    const searchUrl = getSearchURL(word)

    const handleClose = (): void => {
        setOpen(false)
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                    Le mot était <b>{word}</b>. (Vous ne connaissez pas ce mot ?{' '}
                    <Link href={searchUrl} target="_blank">
                        Voir la définition
                    </Link>
                    )
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Réessayer
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EndOfGameModal

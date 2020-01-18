/**
 * @link http://www.petecorey.com/blog/2019/08/19/animating-a-canvas-with-react-hooks/
 */

import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    canvas: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(4),
        background: 'white',
    },
}))

interface CanvasProps {
    scale?: number
    failCount?: number
}

export default function Canvas({ scale = 1, failCount = 10 }: CanvasProps) {
    const classes = useStyles()
    const ref: any = useRef()

    const ratio = (value: number): number => value * scale
    const width = ratio(300)
    const height = ratio(400)

    function draw(step: number, ctx: any): void {
        ctx.lineWidth = 4
        switch (step) {
            case 0:
                ctx.moveTo(0, ratio(400))
                ctx.lineTo(ratio(200), ratio(400))
                ctx.stroke()
                break
            case 1:
                ctx.moveTo(ratio(100), 0)
                ctx.lineTo(ratio(100), ratio(400))
                ctx.stroke()
                break
            case 2:
                ctx.moveTo(ratio(100), 0)
                ctx.lineTo(ratio(200), 0)
                ctx.stroke()
                break
            case 3:
                ctx.moveTo(ratio(200), 0)
                ctx.lineTo(ratio(200), ratio(60))
                ctx.stroke()
                break
            case 4:
                ctx.beginPath()
                ctx.arc(ratio(200), ratio(90), ratio(30), 0, 2 * Math.PI)
                ctx.stroke()
                break
            case 5:
                ctx.moveTo(ratio(200), ratio(120))
                ctx.lineTo(ratio(200), ratio(250))
                ctx.stroke()
                break
            case 6:
                ctx.moveTo(ratio(200), ratio(150))
                ctx.lineTo(ratio(250), ratio(200))
                ctx.stroke()
                break
            case 7:
                ctx.moveTo(ratio(200), ratio(150))
                ctx.lineTo(ratio(150), ratio(200))
                ctx.stroke()
                break
            case 8:
                ctx.moveTo(ratio(200), ratio(250))
                ctx.lineTo(ratio(250), ratio(300))
                ctx.stroke()
                break
            case 9:
                ctx.moveTo(ratio(200), ratio(250))
                ctx.lineTo(ratio(150), ratio(300))
                ctx.stroke()
                break
        }
    }

    useEffect(() => {
        const canvas = ref.current
        const ctx = canvas.getContext('2d')

        // screen ratio
        const dpi = window.devicePixelRatio
        canvas.setAttribute('width', width * dpi)
        canvas.setAttribute('height', height * dpi)
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`

        // Draw x steps
        const steps = []
        for (let i = 0; i < failCount; i++) {
            steps.push(i)
        }
        steps.map((i: number) => draw(i, ctx))
    })

    return (
        <div className={classes.canvas}>
            <canvas ref={ref} style={{ width, height }} />
        </div>
    )
}

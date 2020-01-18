/**
 * @link http://www.petecorey.com/blog/2019/08/19/animating-a-canvas-with-react-hooks/
 */

import React, { useRef, useEffect } from 'react'

interface CanvasProps {
    scale?: number
    failCount?: number
}

export default function Canvas({ scale = 1, failCount = 10 }: CanvasProps) {
    const ref: any = useRef()

    const ratio = (value: number): number => value * scale
    const width = ratio(300)
    const height = ratio(400)

    function draw(step: number, context: any): void {
        switch (step) {
            case 0:
                context.moveTo(0, ratio(400))
                context.lineTo(ratio(200), ratio(400))
                context.stroke()
                break
            case 1:
                context.moveTo(ratio(100), 0)
                context.lineTo(ratio(100), ratio(400))
                context.stroke()
                break
            case 2:
                context.moveTo(ratio(100), 0)
                context.lineTo(ratio(200), 0)
                context.stroke()
                break
            case 3:
                context.moveTo(ratio(200), 0)
                context.lineTo(ratio(200), ratio(60))
                context.stroke()
                break
            case 4:
                context.beginPath()
                context.arc(ratio(200), ratio(90), ratio(30), 0, 2 * Math.PI)
                context.stroke()
                break
            case 5:
                context.moveTo(ratio(200), ratio(120))
                context.lineTo(ratio(200), ratio(250))
                context.stroke()
                break
            case 6:
                context.moveTo(ratio(200), ratio(150))
                context.lineTo(ratio(250), ratio(200))
                context.stroke()
                break
            case 7:
                context.moveTo(ratio(200), ratio(150))
                context.lineTo(ratio(150), ratio(200))
                context.stroke()
                break
            case 8:
                context.moveTo(ratio(200), ratio(250))
                context.lineTo(ratio(250), ratio(300))
                context.stroke()
                break
            case 9:
                context.moveTo(ratio(200), ratio(250))
                context.lineTo(ratio(150), ratio(300))
                context.stroke()
                break
        }
    }

    useEffect(() => {
        const canvas = ref.current
        const context = canvas.getContext('2d')

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
        steps.map((i: number) => draw(i, context))
    })

    return <canvas ref={ref} style={{ width, height }} />
}

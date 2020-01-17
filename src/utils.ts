export function computeDisplay(phrase: string, usedLetters: string[]): string {
    return phrase.replace(/\w/g, letter =>
        usedLetters.includes(letter) ? letter : '_',
    )
}

export function countUnderscore(str: string): number {
    return str.split('').filter(letter => letter === '_').length
}

export function normalizeString(str: string): string {
    // Remove "é" & "è" french accents
    const output = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    return output.toLowerCase()
}

export function getRandomWord(array: any[]): string {
    return array[Math.floor(Math.random() * array.length)]
}

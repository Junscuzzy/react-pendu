import React from 'react'
import { Link } from '@material-ui/core'

const SearchLink = ({ word }: { word: string }) => {
    const link = `https://www.google.com/search?q=${word}`
    return (
        <Link href={link} target="_blank">
            {word}
        </Link>
    )
}

export default SearchLink

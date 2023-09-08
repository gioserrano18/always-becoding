import React from 'react';

export default function PokeListPrevButton({setPokeOffset, pokeOffset, setIsLoading}) {
    return (
        <button className='btn btn-primary' onClick={() =>{
            let newOffset;

            if (pokeOffset <=10) {
                newOffset = 0
            } else {
                newOffset = pokeOffset - 10
                setIsLoading(true)
            }

            setPokeOffset(newOffset)
            
        }}>Prev Page</button>
    )
}
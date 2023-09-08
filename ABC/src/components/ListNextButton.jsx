import React from 'react';

export default function PokeListNextButton({setPokeOffset, pokeOffset, setIsLoading}) {
    return (
        <button className='btn btn-primary' onClick={() =>{
            let newOffset;

            if (pokeOffset >=1000) {
                newOffset = 1000
            } else {
                newOffset = pokeOffset + 10
                setIsLoading(true)
            }
            setPokeOffset(newOffset);
        }}>Next Page</button>
    )
}
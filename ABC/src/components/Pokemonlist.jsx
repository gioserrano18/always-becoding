import React, { useState, useEffect } from 'react';
import PokemonRow from './PokemonRow';
import ListNextButton from './ListNextButton';
import ListPrevButton from './ListPrevButton';



export default function PokeList({ pokemonObj, pokeOffset, setPokeOffset, setSelectedPokemonName, setSelectedPokemonId ,setIsSideLoading }) {
  const [pokeList, setPokeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${pokeOffset}`);
        const data = await response.json();
        setPokeList(data.results);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPokemon();
  }, [pokeOffset]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => {
      clearTimeout(timeout); 
    };
  }, [pokeList]);

  return (
    <table>
      <thead>
        <tr>
          <th className="text-4xl font-bold">PokéDex</th>
        </tr>
      </thead>
      <tbody>
        <tr className = "Pokedex-classes">
          <td>Pokedex#</td>
          <td>Name</td>
          <td>Sprite</td>
          <td>Type</td>
        </tr>
        {isLoading ? (
          <tr>
            <td colSpan="4">
              <h1>
                Loading...
              </h1>
            </td>
          </tr>
        ) : (
          !isLoading &&
          pokeList.map(pokemon => (
            <PokemonRow  pokemonObj={pokemonObj} setIsSideLoading={setIsSideLoading} setSelectedPokemonName={setSelectedPokemonName} setSelectedPokemonId={setSelectedPokemonId} key={pokemon.name} pokemon={pokemon} />
          ))
        )}
        <tr>
          <td colSpan={2}><ListPrevButton setPokeOffset={setPokeOffset} pokeOffset={pokeOffset} setIsLoading={setIsLoading}/></td>
          <td colSpan={2}><ListNextButton setPokeOffset={setPokeOffset} pokeOffset={pokeOffset} setIsLoading={setIsLoading}/></td>
        </tr>
      </tbody>
    </table>
  );
}
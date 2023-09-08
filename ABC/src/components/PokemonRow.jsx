import { useEffect, useState } from "react";

export default function PokeRow({ pokemonObj ,pokemon, setSelectedPokemonName, setSelectedPokemonId ,setIsSideLoading }) {

    const [spriteUrl, setSpriteUrl] = useState("")
    const [pokemonId, setpokemonId] = useState("")
    const [type1, setType1] = useState("")
    const [type2, setType2] = useState("")

    useEffect(() => {
        async function fetchPokemonInfo(pokemonName) {
            try {
              const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
              const data = await response.json();
              //set and update useful variables
              setSpriteUrl(data.sprites.front_default);
              setpokemonId(data.id);
              setType1(data.types[0].type.name);
              if (data.types.length > 1){
                setType2(data.types[1].type.name)
              }
            } catch (error) {
              console.log(error);
              return [];
            }
        }
        fetchPokemonInfo(pokemon.name)
    }, [])

    useEffect(() => {
      const timeout = setTimeout(() => {
        setIsSideLoading(false);
      }, 1000);

      return () => {
        clearTimeout(timeout)
      }
    })

    return (
        <tr className="poke-row" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={() => {
            setSelectedPokemonName(pokemon.name)
            setSelectedPokemonId(pokemonId)
            setIsSideLoading(true)
        }}>
            <td>{pokemonId}</td>
            <td>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</td>
            <td><img src={spriteUrl} /></td>
            {type2 ? <td>{type1.charAt(0).toUpperCase() + type1.slice(1)}/{type2.charAt(0).toUpperCase() + type2.slice(1)}</td> : <td>{type1.charAt(0).toUpperCase() + type1.slice(1)}</td>}
        </tr>
    )
}
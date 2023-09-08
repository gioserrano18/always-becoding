import React from "react";

export default function SinglePokemonView({ pokemonObj, species, isSideLoading, setIsSideLoading }) {


    if (!pokemonObj || Object.keys(pokemonObj).length === 0 || !species || Object.keys(species).length === 0) {
        return <div>Loading...</div>;
      }
      
    

    const pokeName = pokemonObj.name.charAt(0).toUpperCase() + pokemonObj.name.slice(1)
    const type1 = pokemonObj.types[0].type.name.charAt(0).toUpperCase() + pokemonObj.types[0].type.name.slice(1);
    let type2 = null
    const abilities = pokemonObj.abilities;
    const originalFlavorText = species.flavor_text_entries;
    const englishFlavorText = originalFlavorText.find(entry => entry.language.name === 'en');
    let flavorText = "???";
    if (englishFlavorText) {
        flavorText = englishFlavorText.flavor_text.replace(/[\n\f]/g, " ").replace("POKéMON", "pokémon");
    };
    
    if (pokemonObj.types.length > 1){
        type2 = pokemonObj.types[1].type.name.charAt(0).toUpperCase() + pokemonObj.types[1].type.name.slice(1);
    }

    return(
        <>
        {isSideLoading ?  (
            <div>
                <img className='animate__animated animate__rotateIn' src="https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png" alt="spinning pokeball" width='25%'/>
            </div>
        ) : (
            <div> 
            <div>
                <h1>{pokeName + ` #${pokemonObj.id}`}</h1>
                <img width="100%" src={pokemonObj.sprites.other["official-artwork"].front_default} />
            </div>
            <div>
                <h5>Summary</h5>
                <article className="border rounded p-1">
                    {flavorText ? flavorText : "???"}
                </article>
            </div>
            <div style={{display: 'inline-block'}}>
                <table className='table border'>
                    <thead>
                        <tr>
                            <th colSpan={3}>{pokeName}'s Stats</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colSpan={3}>Type</th>
                        </tr>
                        <tr>
                           {type2 ? <td colSpan={3}>{type1}/{type2}</td> : <td colSpan={2}>{type1}</td>}
                        </tr>
                        <tr>
                            <th>Height</th>
                            <th>Weight</th>
                        </tr>
                        <tr>
                            <td>{pokemonObj.height/10 + "m"}</td>
                            <td>{pokemonObj.weight/10 + "kg"}</td>
                        </tr>
                        <tr>
                            <th colSpan={3}>Abilities</th>
                        </tr>
                        {abilities.map((ability, index) => (
                            <tr key={ability.ability.name + index}><td colSpan={3}>{ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</td></tr>
                        ))}
                        {species.habitat && (<tr><th colSpan={3}>Habitat</th></tr>)}
                        {species.habitat && (<tr><td colSpan={3}>{species.habitat.name.charAt(0).toUpperCase() + species.habitat.name.slice(1)}</td></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
        )}
        
        </>
    )
}
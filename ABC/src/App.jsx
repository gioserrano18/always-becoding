import { useState, useEffect } from 'react';
import PokemonList from './components/Pokemonlist';
import Header from './components/Header';
import SinglePokemonView from './components/SinglePokemonView';
import PreviewList from './components/PreviewList';


function App() {
  const [selectedPokemonName, setSelectedPokemonName] = useState(null);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null)
  const [pokemonObj, setPokemonObj] = useState({})
  const [species, setSpecies] = useState({})
  const [pokeOffset, setPokeOffset] = useState(0)
  const [isSideLoading, setIsSideLoading] = useState(true)
  
  
  useEffect(() => {
    async function fetchPokemonInfo() {
      if (!selectedPokemonName) return

      try {
        const response_pokemonObj = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`);
        const response_pokemonSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemonId}`);
        const data_pokemonObj = await response_pokemonObj.json()
        const data_pokemonSpecies = await response_pokemonSpecies.json()
        setPokemonObj(data_pokemonObj)
        setSpecies(data_pokemonSpecies)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPokemonInfo()
  }, [selectedPokemonName, selectedPokemonId])

  return (
    <div className="bg-gray-100 min-h-screen">
    <Header className="bg-blue-500 p-4 text-white text-center"/>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
          <PreviewList />
        </div>
        <hr className = 'divider' />
        <div className="space-y-4 bg-white p-4 rounded shadow">
          <PokemonList pokemonObj={pokemonObj} pokeOffset={pokeOffset} setPokeOffset={setPokeOffset} setSelectedPokemonName={setSelectedPokemonName} setSelectedPokemonId={setSelectedPokemonId} setIsSideLoading={setIsSideLoading}/>
          <div>
          <div>
            <button type="button" onClick={() => {
              setSelectedPokemonName(null)
            }}></button>
            <h1 className='offcanvas-title' id="offcanvasRightLabel"></h1>
            </div>
              <div className = "bg-white p-4 rounded shadow">
                <SinglePokemonView pokemonObj={pokemonObj} species={species} isSideLoading={isSideLoading} setIsSideLoading={setIsSideLoading}/>
              </div>
          </div>
      
        </div>
        </div>
      </div>
  )
}

export default App

import React, { useState, useEffect } from 'react';

function PreviewList() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [featuredItem, setFeaturedItem] = useState(null);
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  
  const items = [
    { id: 1, pokemonName: 'pikachu' },
    { id: 2, pokemonName: 'charizard' },
    { id: 3, pokemonName: 'bulbasaur' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${hoveredItem?.pokemonName}`
        );
        const data = await response.json();
        setPokemonData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        setLoading(false);
      }
    };

    if (hoveredItem) {
      fetchData();
    }
  }, [hoveredItem]);

  const featureItem = (item) => {
    setFeaturedItem(item);
  };

  const filteredItems = items.filter(item =>
    item.pokemonName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Pokémon Preview List</h1>
      <input
        type="text"
        placeholder="Filter Pokémon..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredItems.map((item) => (
          <li
            key={item.id}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => featureItem(item)}
          >
            {item.pokemonName}
          </li>
        ))}
      </ul>
      <div className="preview">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {featuredItem && (
              <div>
                <h2>Featured Pokémon: {featuredItem.pokemonName}</h2>
                <img
                  src={pokemonData.sprites?.front_default}
                  alt={`${featuredItem.pokemonName} sprite`}
                />
                <p>Type: {pokemonData.types?.[0]?.type?.name}</p>
              </div>
            )}
            {hoveredItem && !featuredItem && (
              <div>
                <h2>{hoveredItem.pokemonName}</h2>
                <img
                  src={pokemonData.sprites?.front_default}
                  alt={`${hoveredItem.pokemonName} sprite`}
                />
                <p>Type: {pokemonData.types?.[0]?.type?.name}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PreviewList;
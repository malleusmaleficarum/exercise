import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [shortEffect, setShortEffect] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [flavor, setFlavor] = useState([]);
  const url = 'https://pokeapi.co/api/v2/ability';

  const handleClick = async () => {
    try {
      const data = await fetch(`${url}/${search}`);
      const res = await data.json();
      setShortEffect(res.effect_entries);
      setPokemon(res.pokemon);
      setFlavor(res.flavor_text_entries);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='App'>
      <h1>Pokemon Ability</h1>
      <input
        type='text'
        placeholder='input ability...'
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleClick}>Search</button>
      <p>
        <b>Short Effect: </b>
        {shortEffect.map((data, i) => {
          return <span key={i}>{data.short_effect}</span>;
        })}
      </p>
      <p>
        <b>Pokemon: </b>
        {pokemon.map((data, i) => {
          return <span key={i}>{data.pokemon.name},</span>;
        })}
      </p>
      <p>
        <b>Flavor: </b>
        {flavor.map((data, i) => {
          if (data.language.name === 'en') {
            return <span key={i}>{data.flavor_text},</span>;
          }
          return null;
        })}
      </p>
    </div>
  );
}

export default App;

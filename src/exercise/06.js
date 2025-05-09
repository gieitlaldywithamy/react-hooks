// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm } from '../pokemon';
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info

function PokemonInfo({pokemonName}) {
    const [state, setState] = React.useState({
      status: 'idle',
      pokemon: null,
      error: null,
    });
    const {status, pokemon, error} = state;
    React.useEffect(() => {
      if (!pokemonName) {
        return;
      }
      setState({status: 'pending'});
      fetchPokemon(pokemonName).then(
        pokemon => {
          setState({status: 'resolved', pokemon})
        },
        error => {
          setState({status: 'error', pokemon})
        }
      )
    }, [pokemonName]);

    if (status==='idle') {
      return 'Submit a pokemon'
    } else if (status==='pending') {
      return <PokemonInfoFallback name={pokemonName} />
    } else if ( status==='rejected') {
      return (
        <div role="alert">
          There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        </div>
      )
    } else if ( status === 'resolved') {
      return <PokemonDataView pokemon={pokemon} />
    }
  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, make sure to update the loading state
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App

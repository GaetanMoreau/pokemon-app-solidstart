import { createEffect, createSignal } from 'solid-js';
import pokemons from '../assets/data/pokemons.json';
import { selectRandomPokemon, getRandomPosition } from "../utils/pokemonUtils";
import { Pokemon, PositionedPokemon } from "../types/pokemon";

export default function Home() {
  const [currentPokemons, setCurrentPokemons] = createSignal<PositionedPokemon[]>([]);

  createEffect(() => {
    const intervalId = setInterval(() => {
      const updatedPokemons = selectRandomPokemon(pokemons, 6).map(
        (pokemon) => ({
          ...pokemon,
          position: getRandomPosition(),
        })
      );
      setCurrentPokemons(updatedPokemons);
    }, 3000);

    return () => clearInterval(intervalId);
  });

  const handleCapture = async (pokemon: Pokemon) => {
    const pokemonCaptured = {
      uuid: Date.now(),
      id: pokemon.id,
      name: pokemon.name,
      sprites: {
        front_default: pokemon.sprites.front_default,
      },
    };
    try {
      const response = await fetch("/api/capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemonCaptured),
      });

      if (!response.ok) {
        throw new Error("Problème lors de la capture du Pokémon");
      }

      const result = await response.json();
      let info = document.querySelector('.pokemon__info')
      info?.classList.add("in");
      setTimeout(() => {
        info?.classList.remove("in");
      }, 1000);
    } catch (error) {
      console.error("Erreur de capture:", error);
    }
  };

  return (
    <div>
      <div>
        {currentPokemons().map((pokemon: PositionedPokemon, index) => (
          <div
            class="wild__pokemon"
            onClick={() => handleCapture(pokemon)}
            style={{
              position: "absolute",
              left: `${pokemon.position.x}px`,
              top: `${pokemon.position.y}px`,
            }}
          >
            <img src={pokemon.sprites.front_default as string} alt={`Pokemon ${index}`} />
          </div>
        ))}
      </div>
      <p class="pokemon__info">Pokemon capturé !</p>
    </div>
  );
}
import pokemons from "../assets/data/pokemons.json";
import pokemonsSeen from "../assets/data/seen.json";
import { Pokemon } from "../types/pokemon";
import { selectRandomPokemon, getRandomPosition } from "../utils/pokemonUtils";
import {
  useRouteData
} from "solid-start";

export function routeData() {
  return {
    pokemons
  };
}


export default function Home() {
  const data = useRouteData<typeof routeData>();
  let { pokemons } = data;

  const intervalId = setInterval(() => {
    const updatedPokemons = selectRandomPokemon(pokemons, 6).map(
      (pokemon: Pokemon) => ({
        ...pokemon,
        position: getRandomPosition(),
      })
    );
  }, 3000);

  clearInterval(intervalId);

  return (
    <>
      <section class="home__container">
        <h1>Attrape les pokemons et complète ton Pokedex !</h1>
      </section>
      <div>
        {pokemons.map((pokemon, index) => (
          <div
            key={index}
            className="wild__pokemon"
            // onClick={() => handleCapture(pokemon)}
            style={{
              position: "absolute",
              // left: `${pokemon.position.x}px`,
              // top: `${pokemon.position.y}px`,
            }}
          >
            <img src={pokemon.sprites.front_default} alt={`Pokemon ${index}`} />
          </div>
        ))}
      </div>
      <p class="pokemon__info">Pokemon capturé !</p>
    </>
  );
}

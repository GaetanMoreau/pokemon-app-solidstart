import pokemons from "../../assets/data/pokemons.json";
import pokemonsSeen from "../../assets/data/seen.json";
import { Pokemon } from "../../types/pokemon";
import {
    A,
    useRouteData
} from "solid-start";

export function routeData(): { pokemons: Pokemon[]; pokemonsSeen: number[] } {
    return {
        pokemons,
        pokemonsSeen,
    };
}

export default function Pokedex() {
    const data = useRouteData<typeof routeData>();
    const { pokemons, pokemonsSeen } = data;

    const isPokemonSeen = (pokemonId: number) => {
        return pokemonsSeen.some((seen) => seen === pokemonId);
    };

    const pokemonsSeenNumber = Object.keys(pokemonsSeen).length;
    const pokemonsNumber = Object.keys(pokemons).length;

    return (
        <>
            <section class="home__container">
                <h1>Vous avez rencontré {pokemonsSeenNumber} pokemons sur {pokemonsNumber}</h1>
            </section>
            <section class="pokedex__container">
                {pokemons.map((pokemon, index: number) => {
                    const seenClass = isPokemonSeen(pokemon.id) ? "pokemon--seen" : "";
                    return (
                        <A href={`/pokedex/${pokemon.id}`} >
                            <div class={`pokemon__item ${seenClass}`}>
                                <div class="pokemon__header">
                                    <img src="/image/pokeball.webp"></img>
                                    <span>No.{pokemon.id}</span>
                                </div>
                                <img
                                    class="pokemon__image"
                                    src={pokemon.sprites.front_default as string}
                                ></img>
                                <h2 class="pokemon__name">
                                    {isPokemonSeen(pokemon.id) ? pokemon.name : "???"}
                                </h2>
                            </div>
                        </A>
                    );
                })}
            </section>
        </>
    );
}

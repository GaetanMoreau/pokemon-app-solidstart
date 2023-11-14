import pokemons from "../../assets/data/pokemons.json";
import { Pokemon } from "../../types/pokemon";
import pokemonsSeen from "../../assets/data/seen.json";
import {
    A, useParams, useRouteData
} from "solid-start";

export function routeData(): { pokemons: Pokemon[]; pokemonsSeen: number[] } {
    return {
        pokemons,
        pokemonsSeen,
    };
}

export default function PokemonDetails() {
    const data = useRouteData<typeof routeData>();
    const { pokemons, pokemonsSeen } = data;

    const { id: pokemonId } = useParams();

    if (!pokemonId) {
        return <div>Invalid Pokemon ID</div>;
    }

    const isPokemonSeen = (pokemonId: number) => {
        return pokemonsSeen.some((seen) => seen === pokemonId);
    };

    const pokemonNumericId = parseInt(pokemonId, 10);
    const pokemon = pokemons.find((pokemon) => pokemon.id === pokemonNumericId);
    if (!pokemon) {
        return <div>Pokémon non trouvé</div>;
    }
    const seenClass = isPokemonSeen(pokemon.id) ? "pokemon--seen" : "";

    return (
        <>
            <section class="home__container">
                <A href={"/pokedex"} class="pokedex__return">Retour au pokedex</A>
            </section>
            <section class="pokemon-details__container">
                <div class={`pokemon__item ${seenClass}`}>
                    <img
                        class="pokemon-details__image"
                        src={pokemon.sprites.front_default as string}
                    ></img>
                    <div class="pokemon-details__name">
                        <h1>
                            <span>No.{pokemon.id} </span>
                            {isPokemonSeen(pokemon.id) ? pokemon.name : "???"}
                        </h1>
                    </div>
                </div>
            </section>
        </>
    );
}

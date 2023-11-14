import capturedPokemons from "../../assets/data/bag.json";
import pokemons from "../../assets/data/pokemons.json";
import { Pokemon } from "../../types/pokemon";

import {
    A,
    useRouteData
} from "solid-start";

export function routeData() {
    return {
        pokemons,
        capturedPokemons,
    };
}

const handleReleased = async (pokemon: Pokemon) => {
    const pokemonReleased = {
        uuid: pokemon.uuid
    };
    try {
        const response = await fetch("/sac/" + pokemon.uuid, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Problème lors de la libération du Pokémon");
        }

    } catch (error) {
        console.error(error);
    }
};

export default function Sac() {
    const data = useRouteData<typeof routeData>();
    const { capturedPokemons } = data;

    return (
        <>
            <section class="bag__container">
                {capturedPokemons.map((pokemon, index) => {
                    return (
                        <div key={index}>
                            <A href={`/pokedex/${pokemon.id}`}>
                                <div class="pokemon__item" key={index}>
                                    <div class="pokemon__header">
                                        <img src="/image/pokeball.webp"></img>
                                        <span>No.{pokemon.id}</span>
                                    </div>
                                    <img
                                        class="pokemon__image"
                                        src={pokemon.sprites.front_default}
                                    ></img>
                                    <h2 class="pokemon__name">{pokemon.name}</h2>
                                </div>
                            </A>
                            <div class="pokemon__action__container">
                                <p class="pokemon__action" onClick={() => handleReleased(pokemon)}>Liberer</p>
                                <p class="pokemon__action" onClick={() => handleRename(pokemon)}>Renommer</p>
                            </div>
                        </div>
                    );
                })}
            </section>
            <div class="pokemon__form__container">
                <h2>Choisissez le nouveau nom du pokemon</h2>
                {/* <Form class="pokemon__form" method="post" action={`/sac`} onSubmit={handleFormSubmit}>
                    <p>
                        <input type="text" name="name" value={currentPokemonToRename} onChange={e => setCurrentPokemonToRename(e.target.value)} />
                    </p>
                    <p>
                        <input type="hidden" name="uuid" defaultValue={currentPokemonUuid} />
                    </p>
                    <button type="submit">Renommer</button>
                </Form >
                <button onClick={handleFormSubmit}>Annuler</button> */}
            </div>
        </>
    );
}

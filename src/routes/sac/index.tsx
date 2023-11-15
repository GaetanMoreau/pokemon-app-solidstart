import { Form } from "solid-start/data/Form";
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

const handleReleased = async (pokemon: any) => {
    const pokemonReleased = {
        uuid: pokemon.uuid
    };
    try {
        const response = await fetch("/api/delete/" + pokemon.uuid, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Problème lors de la libération du Pokémon");
        }

    } catch (error) {
        console.error(error);
    }
};

const handleRename = async (pokemon: any) => {
    let pokemonRenameForm = document.querySelector('.pokemon__form__container')
    pokemonRenameForm?.classList.add("in");
}

const handleFormSubmit = async () => {
    let pokemonRenameForm = document.querySelector('.pokemon__form__container')
    pokemonRenameForm?.classList.remove("in");
    const pokemonToRename = {
        uuid: 1700077977712,
        name: '??',
    };
    try {
        const response = await fetch("/api/rename/" + pokemonToRename.uuid, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pokemonToRename),
        });

        if (!response.ok) {
            throw new Error("Problème lors de la capture du Pokémon");
        }

        const result = await response.json();
    } catch (error) {
        console.error("Erreur de renommage:", error);
    }
}

export default function Sac() {
    const data = useRouteData<typeof routeData>();
    const { capturedPokemons } = data;

    return (
        <>
            <section class="bag__container">
                {capturedPokemons.map((pokemon, index) => {
                    return (
                        <div>
                            <A href={`/pokedex/${pokemon.id}`}>
                                <div class="pokemon__item">
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
                <Form class="pokemon__form" method="post" action={`/sac`} onSubmit={handleFormSubmit}>
                    <p>
                        <input type="text" name="name" />
                    </p>
                    <p>
                        <input type="hidden" name="uuid" />
                    </p>
                    <button type="submit">Renommer</button>
                </Form >
                <button onClick={handleFormSubmit}>Annuler</button>
            </div>
        </>
    );
}

import { Form } from "solid-start/data/Form";
import capturedPokemons from "../../assets/data/bag.json";
import pokemons from "../../assets/data/pokemons.json";
import { Pokemon } from "../../types/pokemon";
import { createSignal } from 'solid-js';

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

const [selectedPokemon, setSelectedPokemon] = createSignal<Pokemon | null>(null);

const handleReleased = async (pokemon: Pokemon) => {
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

const handleRename = async (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    let pokemonRenameForm = document.querySelector('.pokemon__form__container')
    pokemonRenameForm?.classList.add("in");
}

const handleFormCancel = async () => {
    let pokemonRenameForm = document.querySelector('.pokemon__form__container')
    pokemonRenameForm?.classList.remove("in");
}

const handleFormSubmit = async (event: Event) => {
    event.preventDefault();
    const pokemonData = selectedPokemon();
    if (!pokemonData) {
        console.error("Aucun Pokémon sélectionné pour renommer");
        return;
    }

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name");
    const uuid = pokemonData.uuid;

    const pokemonToRename = {
        uuid: uuid,
        name: name,
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
                        <input type="text" name="name" value={selectedPokemon()?.name || ''} />
                    </p>
                    <p>
                        <input type="hidden" name="uuid" value={selectedPokemon()?.uuid || ''} />
                    </p>
                    <button type="submit">Renommer</button>
                </Form>
                <button onClick={handleFormCancel}>Annuler</button>
            </div>
        </>
    );
}

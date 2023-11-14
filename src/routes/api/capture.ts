import { json } from 'solid-start/server';
import fs from 'fs/promises';

export async function POST({ request }: { request: Request }): Promise<Response> {
    if (request.method !== "POST") {
        return json({ message: "Méthode non autorisée" }, { status: 405 });
    }

    const pokemon = await request.json();

    const bagFilePath = "./src/assets/data/bag.json";
    const bag = JSON.parse(await fs.readFile(bagFilePath, "utf8"));

    const seenFilePath = "./src/assets/data/seen.json";
    const seen = new Set(JSON.parse(await fs.readFile(seenFilePath, "utf8")));

    bag.push(pokemon);
    seen.add(pokemon.id);

    await fs.writeFile(bagFilePath, JSON.stringify(bag, null, 2), "utf8");
    await fs.writeFile(seenFilePath, JSON.stringify([...seen], null, 2), "utf8");

    return json({ message: "Pokémon capturé avec succès!" });
};

import { json } from 'solid-start/server';
import fs from 'fs/promises';

export async function POST({ params, request }: { params: { uuid: string }, request: Request }): Promise<Response> {
    const formData = new URLSearchParams(await request.text());
    const newName = formData.get("name");
    const uuid = params.uuid;

    if (!uuid) {
        return json({ message: 'UUID not provided.' }, { status: 400 });
    }

    const bagFilePath = './src/assets/data/bag.json';

    try {
        const bagData = await fs.readFile(bagFilePath, 'utf8');
        const bag = JSON.parse(bagData);
        const numUuid = Number(uuid);

        for (let i = 0; i < bag.length; i++) {
            if (bag[i].uuid === numUuid) {
                bag[i].name = newName;
                break;
            }
        }

        await fs.writeFile(bagFilePath, JSON.stringify(bag, null, 2), 'utf8');

        return json({ message: 'Pokémon renomé avec succès.' }, { status: 200 });

    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
        return json({ message: 'Erreur lors de la manipulation du fichier JSON' }, { status: 500 });
    }
};


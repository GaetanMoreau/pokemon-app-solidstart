import { json } from 'solid-start/server';
import fs from 'fs/promises';

export const action = async ({ request }: { request: Request }): Promise<Response> => {
    const formData = await request.formData();
    const uuid = formData.get('uuid');

    if (!uuid) {
        return json({ message: 'UUID not provided.' }, { status: 400 });
    }

    const bagFilePath = '../assets/data/bag.json';

    try {
        const bagData = await fs.readFile(bagFilePath, 'utf8');
        const bag = JSON.parse(bagData);
        const numUuid = Number(uuid);
        const filteredBag = bag.filter((item: { uuid: number; }) => item.uuid !== numUuid);

        await fs.writeFile(bagFilePath, JSON.stringify(filteredBag, null, 2), 'utf8');

        return json({ message: 'Pokémon libéré avec succès.' }, { status: 200 });

    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
        return json({ message: 'Erreur lors de la manipulation du fichier JSON' }, { status: 500 });
    }
};

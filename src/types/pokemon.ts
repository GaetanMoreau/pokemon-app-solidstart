export type Pokemon = {
  base_experience: number;
  forms: Array<{
    name: string;
    url: string;
  }>;
  height: number;
  held_items: Array<any>;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  weight: number;
};

export type PositionedPokemon = Pokemon & {
  position: {
    x: number;
    y: number;
  };
};

export type bagPokemon = Pokemon & {
  uuid: number;
};

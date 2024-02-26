export interface IfPokemonList {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}

export interface IfPokemonCardItem {
  color: string;
  id: number;
  name: string;
  image: string;
  types: IfPokemonType[];
}

export interface IfPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

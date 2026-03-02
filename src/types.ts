// ─── Shared Types ────────────────────────────────────────────────

export interface CharacterData {
    id: number;
    name: string;
    image: string;
    ki: number;
    maxKi: number;
    race: string;
    gender: string;
    description: string;
    affiliation: string;
    originPlanet?: {
        name: string;
        image: string;
        description: string;
    };
    transformations?: {
        id: number;
        name: string;
        image: string;
        ki: string;
    }[];
}

export interface Meta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface DataCharacter {
    items: CharacterData[];
    links: object;
    meta: Meta;
}

import type { Hero } from "./hero.interface";

export interface GetHeroesResponse {
    total:  number;
    pages:  number;
    heroes: Hero[];
}


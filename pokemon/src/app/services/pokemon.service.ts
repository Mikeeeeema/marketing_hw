import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  expectPokemon,
  kanto,
  Pokemon,
  PokemonEntriesEntity,
  Type,
} from './pokemon.interface';
import { filter, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private kantourl = 'https://pokeapi.co/api/v2/pokedex/kanto';
  private searchurlurl = 'https://pokeapi.co/api/v2/pokemon/';
  private http = inject(HttpClient);

  fetchEntries() {
    return this.http.get<kanto>(this.kantourl).pipe(
      map((res: kanto) => {
        return res.pokemon_entries
          ?.slice(0, 20)
          .map((res: PokemonEntriesEntity) => res.pokemon_species.name);
      })
    );
  }

  getPokemon(name: string) {
    return this.http.get<Pokemon>(this.searchurlurl + name).pipe(
      map(
        (res: Pokemon) =>
          ({
            picture: res.sprites.front_default,
            name: res.name,
            types: res.types.map((item: Type) => item.type.name),
          } as expectPokemon)
      )
    );
  }

  setPokemons(pokemon_entries: string[]) {
    const requests = pokemon_entries.map((item: string) =>
      this.getPokemon(item)
    );

    return forkJoin(requests).pipe(
      map((pokemons: expectPokemon[]) =>
        pokemons.filter(
          (pokemon: expectPokemon) =>
            pokemon.types.includes('grass') ||
            pokemon.types.includes('fire') ||
            pokemon.types.includes('water')
        )
      )
    );
  }
}

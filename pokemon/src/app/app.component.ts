import { Component, inject } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { expectPokemon, Pokemon } from './services/pokemon.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pokemon';
  pokemon_entries?: string[];
  private pokemonService = inject(PokemonService);
  data?: expectPokemon[];

  ngOnInit() {
    this.pokemonService.fetchEntries().subscribe((res) => {
      this.pokemon_entries = res;
      console.log(this.pokemon_entries);

      if (this.pokemon_entries) {
        this.pokemonService
          .setPokemons(this.pokemon_entries)
          .subscribe((pokemon: expectPokemon[]) => {
            this.data = pokemon;
            console.log(this.data);
          });
      }
    });

    this.pokemonService.getPokemon('bulbasaur').subscribe(console.log);
  }
}

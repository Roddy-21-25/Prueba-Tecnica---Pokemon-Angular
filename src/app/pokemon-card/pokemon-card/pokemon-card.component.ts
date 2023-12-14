import { Component, OnInit } from '@angular/core';
import { PokeapiserviceService } from 'src/app/pokeapiservice.service';

import { Pokemon } from 'src/app/Entity/pokemon.model';
import { forkJoin } from 'rxjs';

import { getTypeClass } from 'src/app/services/getTypeClass';
import { createPokemon } from 'src/app/services/createPokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: [
    './pokemon-card.component.scss',
    './pokemon-card-typesStyles.component.scss',
  ],
})
export class PokemonCardComponent implements OnInit {
  constructor(private pokeApiService: PokeapiserviceService) {}

  pokemonListTeam: Pokemon[] = [];

  // asigna un stilo personalizado a cada tipo de pokemon
  getTypeClass(type: string): string {
    return getTypeClass(type);
  }

  ngOnInit() {
    // abstraccion de los metodos del service del api
    const electricObservable = this.pokeApiService.getElectricPokemons();
    const fireObservable = this.pokeApiService.getFirePokemons();
    const rockObservable = this.pokeApiService.getRockPokemons();
    const waterObservable = this.pokeApiService.getWaterPokemons();

    // conbina varios observables en un solo observable
    forkJoin({
      electric: electricObservable,
      fire: fireObservable,
      rock: rockObservable,
      water: waterObservable,
    }).subscribe({
      next: (results: any) => {
        // creacion del pokemon de turno
        const firePokemon = createPokemon(results.fire, 'Fire', this.pokeApiService);
        const electricPokemon = createPokemon(results.electric,'Electric', this.pokeApiService);
        const waterPokemon = createPokemon(results.water, 'Water', this.pokeApiService);
        const rockPokemon = createPokemon(results.rock, 'Rock', this.pokeApiService);

        this.pokemonListTeam.push(
          firePokemon,
          electricPokemon,
          waterPokemon,
          rockPokemon
        );
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
}

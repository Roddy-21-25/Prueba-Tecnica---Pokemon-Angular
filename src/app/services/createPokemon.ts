import { PokeapiserviceService } from 'src/app/pokeapiservice.service';
import { Pokemon } from 'src/app/Entity/pokemon.model';

export function createPokemon(
  pokemonArray: any[],
  type: string,
  pokeApiService: PokeapiserviceService
): Pokemon {
  const randomIndex = Math.floor(Math.random() * pokemonArray.length);
  const pokemon: Pokemon = new Pokemon(0, '', '', '');

  pokemon.id = pokemonArray[randomIndex].id;
  pokemon.name = pokemonArray[randomIndex].name;
  pokemon.type = type;

  pokeApiService.getPokemon(pokemon.id).subscribe((data) => {
    if (data.sprites) {
      const officialArtwork = data.sprites.other['official-artwork'];
      if (officialArtwork) {
        pokemon.sprite_url = officialArtwork.front_default;
      }
    }
  });

  return pokemon;
}

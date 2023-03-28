import { projectApi } from '@api/apiConfig';
import { Pokemon, PokemonList } from '@models/pokemon.models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PokemonAPI = createApi({
  reducerPath: 'pokemonAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL || 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (build) => ({
    fetchAllPokemons: build.query({
      query: () => ({
        url: 'pokemon',
        method: 'get',
        params: {
          limit: 24,
        },
      }),
      transformResponse: async (response: PokemonList): Promise<Pokemon[]> => {
        const pokemons = await Promise.all(
          response.results.map(async (pokemon: { name: string }) => {
            const { data } = await projectApi.get(`/pokemon/${pokemon.name}`);

            return {
              name: data.name as string,
              url: data.sprites.other.home.front_default as string,
            };
          }),
        );

        return pokemons;
      },
    }),
  }),
});

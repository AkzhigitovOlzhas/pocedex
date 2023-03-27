import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const PokemonAPI = createApi({
  reducerPath: 'pokemonAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL || 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (build) => ({
    fetchAllPocemons: build.query({
      query: () => ({
        url: 'pokemon',
      }),
    }),
  }),
});

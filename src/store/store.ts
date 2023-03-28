import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { PokemonAPI } from './services/PokemonService';

const rootReduser = combineReducers({
  [PokemonAPI.reducerPath]: PokemonAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(PokemonAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReduser>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

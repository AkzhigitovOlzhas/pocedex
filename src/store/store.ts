import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReduser = combineReducers({});

const setupStore = () => {
  return configureStore({
    reducer: rootReduser,
  });
};

export type RootState = ReturnType<typeof rootReduser>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

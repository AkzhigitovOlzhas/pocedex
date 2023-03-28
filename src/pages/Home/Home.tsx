import { PokemonCard } from '@components/PokemonCard/PokemonCard';
import { Pokemon } from '@models/pokemon.models';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { PokemonAPI } from '@store/services/PokemonService';

export const Home = () => {
  const { data, isLoading } = PokemonAPI.useFetchAllPokemonsQuery('');

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <Grid
      container
      padding={2}
      rowSpacing={{ xs: 2, sm: 4, md: 6 }}
      columnSpacing={{ xs: 2, sm: 4, md: 6 }}
    >
      {data &&
        data.map((pokemon: Pokemon) => (
          <Grid key={pokemon.name} item xs={6} sm={4} lg={2}>
            <PokemonCard url={pokemon.url} name={pokemon.name} />
          </Grid>
        ))}
    </Grid>
  );
};

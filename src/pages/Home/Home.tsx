import { projectApi } from '@api/apiConfig';
import { PokemonCard } from '@components/PokemonCard/PokemonCard';
import { PokemonCardInfo } from '@components/PokemonInfoCard/PokemonInfoCard';
import { Pokemon } from '@models/pokemon.models';
import { Drawer, TablePagination, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { PokemonAPI } from '@store/services/PokemonService';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Home = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(24);
  const [searchParams] = useSearchParams();
  const [pokemonInfo, setPokemonInfo] = useState<{
    isOpen: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pokemon?: any;
  }>({
    isOpen: false,
  });

  const { data, isLoading, isFetching } = PokemonAPI.useFetchAllPokemonsQuery({
    limit: rowsPerPage,
    offset: page * rowsPerPage,
    search: searchParams.get('q'),
  });

  if (isLoading || isFetching) {
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

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFetchPokemon = async (name: string) => {
    const { data } = await projectApi.get(`/pokemon/${name}`);

    const ability = await Promise.all(
      data.abilities.map(async (ability: { ability: { name: string } }) => {
        const abilityResponse = await projectApi.get(
          `/ability/${ability.ability.name}`,
        );

        return abilityResponse.data.effect_entries as Array<{
          effect: string;
          short_effect: string;
        }>;
      }),
    );

    const pokemon = {
      name: data.name,
      image: data.sprites.other.home.front_default,
      types: data?.types.map(
        (item: { type: { name: string } }) => item.type.name,
      ),
      ability,
    };
    console.log(
      '🚀 ~ file: Home.tsx:90 ~ handleFetchPokemon ~ pokemon:',
      pokemon,
    );

    setPokemonInfo({ isOpen: true, pokemon });
  };

  return (
    <>
      <Grid
        container
        padding={2}
        rowSpacing={{ xs: 2, sm: 4, md: 6 }}
        columnSpacing={{ xs: 2, sm: 4, md: 6 }}
      >
        {data?.pokemons &&
          data.pokemons.map((pokemon: Pokemon) => (
            <Grid key={pokemon.name} item xs={6} sm={4} lg={2}>
              <PokemonCard
                url={pokemon.url}
                name={pokemon.name}
                types={pokemon.types}
                onOpenInfo={handleFetchPokemon}
              />
            </Grid>
          ))}
      </Grid>
      {data?.pokemons.length ? (
        <TablePagination
          component="div"
          count={Number(data?.count)}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[24, 48, 96]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Typography variant="h3">Not found</Typography>
        </Box>
      )}
      <Drawer
        anchor="bottom"
        open={pokemonInfo.isOpen}
        onClose={() => setPokemonInfo({ isOpen: false })}
      >
        {pokemonInfo?.pokemon && <PokemonCardInfo {...pokemonInfo.pokemon} />}
      </Drawer>
    </>
  );
};

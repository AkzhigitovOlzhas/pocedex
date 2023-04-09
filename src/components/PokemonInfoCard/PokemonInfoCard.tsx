import { StyledChip } from '@components/PokemonCard/PokemonCard';
import { PokeColor } from '@models/shared';
import { Card, CardContent, Grid, Typography } from '@mui/material';

interface Ability {
  effect: string;
  language: {
    name: string;
    url: string;
  };
  short_effect: string;
}

interface Pokemon {
  name: string;
  image: string;
  types: string[];
  ability: Ability[][];
}

export const PokemonCardInfo: React.FC<Pokemon> = ({
  name,
  image,
  types,
  ability,
}) => {
  return (
    <Card style={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <img
            src={image}
            alt={name}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={9}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="subtitle1" component="p">
              Types:{' '}
              {types.map((type) => (
                <StyledChip
                  key={type}
                  label={type}
                  type={type as PokeColor}
                  variant="filled"
                />
              ))}
            </Typography>
            <Typography variant="subtitle1" component="p">
              Ability:
            </Typography>
            <ul>
              {ability.map((effects, i) =>
                effects.map(({ effect, short_effect }, j) => (
                  <li key={i + j}>
                    <Typography variant="body2" component="p">
                      <Typography variant="subtitle2">Effect:</Typography>{' '}
                      {effect}
                    </Typography>
                    <Typography variant="body2" component="p">
                      <Typography variant="subtitle2">Short Effect:</Typography>{' '}
                      {short_effect}
                    </Typography>
                  </li>
                )),
              )}
            </ul>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

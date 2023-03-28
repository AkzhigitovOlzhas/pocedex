import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface PokemonCardProps {
  url: string;
  name: string;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ url, name }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="250"
        sx={{ padding: '1em 1em 0 1em', objectFit: 'contain' }}
        image={url}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

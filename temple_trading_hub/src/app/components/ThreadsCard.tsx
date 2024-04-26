import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, alpha } from '@mui/material';
import Link from 'next/link';

export default function ThreadsCard({ doc, edit }: any) {
  return (
    <Card
      variant='outlined'
      sx={(theme) => ({
        backgroundSize: 'cover',
        outline: '1px solid',
        outlineColor:
          theme.palette.mode === 'light'
            ? alpha('#d9bfbf', 0.5)
            : alpha('#fc9c9c', 0.1),
      })}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#A31F37', color: 'white' }} aria-label='user'>
            {doc.userEmail[0]}
          </Avatar>
        }
        action={
          edit && (
            <IconButton aria-label='edit'>
              <Link href={`/threads/edit/${doc.uid}`}>
                <EditIcon />
              </Link>
            </IconButton>
          )
        }
        title={doc.userEmail}
      />
      {doc.imageUrl && (
        <CardMedia component='img' image={doc.imageUrl} alt={doc.image} />
      )}
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {doc.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

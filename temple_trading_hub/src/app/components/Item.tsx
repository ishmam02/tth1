import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import styles from '../Styles/Item.module.css';

interface ItemProps {
  imageUrl: string;
  item_name: string;
  image: string;
  description: string;
  userEmail: string;
  price: string;
  id: string;
}

const Item: React.FC<ItemProps> = ({
  imageUrl,
  item_name,
  image,
  description,
  userEmail,
  price,
  id,
}) => {
  return (
    <Link href={`/trading/${id}`}>
      <Card variant='outlined'>
        <CardHeader title={item_name} />
        <CardMedia component='img' image={imageUrl} alt={item_name} />
        <CardContent>
          <Typography variant='h6'>Price: {price}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Item;

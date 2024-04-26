// ItemsList.js
import React, { useEffect, useState } from 'react';
import {
  collection,
  getFirestore,
  query,
  getDocs,
  where,
} from 'firebase/firestore';
import Item from './Item';
import { DocumentData } from 'firebase/firestore';
import { ImageListItem } from '@mui/material';

const ItemsList = ({ userID, category }: { userID?: string; category?: string }) => {
  const [items, setItems] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const db = getFirestore();
        const itemsCollection = collection(db, 'listings');
        
        let q = query(itemsCollection);
        if (userID) {
          q = query(itemsCollection, where('userID', '==', userID));
        }
        if (category && category !== 'all') {
          q = query(itemsCollection, where('category', '==', category));
        }
        const querySnapshot = await getDocs(q);
        
        console.log('Query snapshot:', querySnapshot);
        const itemsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          //   condition: doc.data().condition,
          price: doc.data().price,
          imageUrl: doc.data().imageUrl,
          image: doc.data().images,
          description: doc.data().description,
          userEmail: doc.data().userEmail,
          category: doc.data().category,
        }));
        console.log('Items data:', itemsData);
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [userID, category]);

  return (
    <React.Fragment>
      {items.map((item) => (
        <ImageListItem key={item.id}>
          <Item
            imageUrl={item.imageUrl?.[0]}
            item_name={item.title}
            image={item.image?.[0]}
            description={item.description}
            userEmail={item.userEmail}
            price={item.price}
            id={item.id}
          />
        </ImageListItem>
      ))}
    </React.Fragment>
  );
};

export default ItemsList;

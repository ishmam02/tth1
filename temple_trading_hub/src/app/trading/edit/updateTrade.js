import { arrayUnion, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@firebase';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from 'firebase/storage';

export const updateTrade = async (
  user,
  itemname,
  description,
  price,
  category,
  location,
  image,
  productid
) => {
  const docRef = doc(db, 'listings', productid);
  const docData = await getDoc(docRef);

  // delete old image
  const storage = getStorage();
  if (docData.data().images !== 'no-image' && image.name) {
    const listingFile = ref(
      storage,
      `listingImages/${docData.data().images[0]}`
    );
    await deleteObject(listingFile);
  }

  const updatedDoc = await updateDoc(docRef, {
    title: itemname ? itemname : docData.data().title,
    description: description ? description : docData.data().description,
    price: price ? price : docData.data().price,
    category: category ? category : docData.data().category,
    images: image.name ? [`${docRef.id}+${image.name}`] : 'no-image',
    location: location ? location : docData.data().location,
    
  }).catch((error) => {
    console.log('Update lisitng Error');
    return new Response('update listing error', {
      status: 500,
    });
  });

  let link = undefined;

  if (image.name) {
    const imageLocation = `listingImages/${docRef.id}+${image.name}`;

    const storageRef = ref(storage, imageLocation);
    await uploadBytes(storageRef, image);
    link = await getDownloadURL(storageRef);
    await updateDoc(docRef, {
      imageUrl: [link],
    });
  }
};

import { db } from '@firebase';
import {
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  collection,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadThread = async (user, description, image) => {
  const docRef = await addDoc(collection(db, 'threads'), {
    userID: user.uid,
    userEmail: user.email,
    description: description,
    images: image.name ? image.name : '',
  }).catch((error) => {
    console.log('adding thread error');
    return new Response('adding thread error', {
      status: 500,
    });
  });

  let link = undefined;

  if (image.name) {
    const storage = getStorage();
    const imageLocation = `threadImages/${docRef.id}+${image.name}`;
    const storageRef = ref(storage, imageLocation);
    await uploadBytes(storageRef, image);
    link = await getDownloadURL(storageRef);
  }

  await updateDoc(docRef, {
    imageUrl: link ? link : '',
    uid: docRef.id,
  });

  const userDocRef = await updateDoc(doc(db, 'users', user.email), {
    threads: arrayUnion(docRef.id),
  }).catch((error) => {
    console.log('Update User Error');
    return new Response('update user error', {
      status: 500,
    });
  });

  return new Response('Lisitng Posted :)', {
    status: 200,
  });
};

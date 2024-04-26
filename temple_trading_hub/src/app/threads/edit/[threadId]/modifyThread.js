import { db } from '@firebase';
import {
  doc,
  updateDoc,
  arrayRemove,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

export const updateThread = async (description, image, threadId) => {
  const docRef = doc(db, 'threads', threadId);
  const docData = await getDoc(docRef);
  const storage = getStorage();

  if (docData.data().images) {
    const listingFile = ref(
      storage,
      `threadImages/${docRef.id}+${docData.data().images}`
    );
    await deleteObject(listingFile);
  }

  const updatedDoc = await updateDoc(docRef, {
    description: description ? description : docData.data().description,
    images: image && image.name ? image.name : docData.data().images,
  }).catch((error) => {
    console.log('Update thread Error');
    return new Response('update listing error', {
      status: 500,
    });
  });

  let link = undefined;

  if (image.name) {
    const imageLocation = `threadImages/${docRef.id}+${image.name}`;
    const storageRef = ref(storage, imageLocation);
    await uploadBytes(storageRef, image);
    link = await getDownloadURL(storageRef);
    await updateDoc(docRef, {
      imageUrl: link ? link : '',
    });
  }
};

export const deleteThread = async (userid, threadId, imagelocationname) => {
  // delete listing
  const deleteListing = await deleteDoc(doc(db, 'threads', threadId)).catch(
    (error) => {
      console.log('Update thread Error');
      return new Response('update listing error', {
        status: 500,
      });
    }
  );

  // delete listing from users listing arrays
  const userDocUpdate = await updateDoc(doc(db, 'users', userid), {
    threads: arrayRemove(threadId),
  }).catch((error) => {
    console.log('Update User Error');
    return new Response('update user error', {
      status: 500,
    });
  });

  // delete images from firestore
  if (imagelocationname) {
    const storage = getStorage();
    const folderRef = ref(storage, `threadImages/${imagelocationname}`);
    deleteObject(folderRef)
      .then(() => {
        console.log('deletion successful');
      })
      .catch((error) => {
        console.log('error deleting ');
      });
  }

  return new Response('Thread Posted :)', {
    status: 200,
  });
};

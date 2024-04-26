
import { db } from '@firebase';
import { addDoc, doc, updateDoc, arrayUnion, collection} from "firebase/firestore";

import { getStorage, ref, uploadBytes } from "firebase/storage";
import { request } from 'http';

export async function POST(){

    const reqBody = await request.json();

    const user = reqBody.user
    const itemname = reqBody.itemname
    const description = reqBody.description
    const price = reqBody.price
    const category = reqBody.category
    const image = reqBody.image

    const docRef = await addDoc(collection(db, "listings"),  {
        userID: user.uid,
        userEmail: user.email,
        title: itemname,
        description: description,
        price: price,
        category: category,
        images: (image.name ? arrayUnion(image.name): "no-image"),

    }).catch((error) => {
        console.log("adding listing error");
        return new Response("adding listing error", {
            status: 500
        });
        });

    if(image.name){
        const storage = getStorage();
        const imageLocation = `listingImages/${docRef.id}/${image.name}`;
        const storageRef = ref(storage, imageLocation);
        uploadBytes(storageRef, image);
    }

    const userDocRef = await updateDoc(doc(db, "users", user.email), {
        listings: arrayUnion(docRef.id),
    }).catch((error) => {
        console.log("Update User Error");
        return new Response("update user error", {
            status: 500
        });
    });

    return new Response("Lisitng Posted :)", {
        status: 200
    });
}
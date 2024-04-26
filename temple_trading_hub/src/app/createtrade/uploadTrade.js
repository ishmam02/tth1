
import { db } from '@firebase';
import { addDoc, doc, updateDoc, arrayUnion, collection} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";




export const uploadTrade = async (user, itemname, description, price, category, location, image) => {

    const docRef = await addDoc(collection(db, "listings"),  {
        userID: user.uid,
        userEmail: user.email,
        title: itemname,
        description: description,
        price: price,
        category: category,
        location: location,
    }).catch((error) => {
        console.log("adding listing error");
        return new Response("adding listing error", {
            status: 500
        });
        });
    
    let link = undefined;

    if(image.name){
        const storage = getStorage();
        const imageLocation = `listingImages/${docRef.id}+${image.name}`;
        const storageRef = ref(storage, imageLocation);
        await uploadBytes(storageRef, image);
        link = await getDownloadURL(storageRef);
    }

    await updateDoc(docRef , {
        imageUrl: (link ? arrayUnion(link): "no-image"),
        images: (image.name ? [`${docRef.id}+${image.name}`] : "no-image"),
    })

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
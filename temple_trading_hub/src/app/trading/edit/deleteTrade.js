import { db } from '@firebase';
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";


export const deleteTrade = async (userid, listingid, imagelocationname) => {
    // delete listing
    const deleteListing = await deleteDoc(doc(db, "listings", listingid)).catch((error) => {
        console.log("Update lisitng Error");
        return new Response("update listing error", {
            status: 500
        });
    });

    // delete listing from users listing arrays
    const userDocUpdate = await updateDoc(doc(db, "users", userid), {
        listings: arrayRemove(listingid)
    }).catch((error) => {
        console.log("Update User Error");
        return new Response("update user error", {
            status: 500
        });
    });

    // delete images from firestore
    const storage = getStorage();
    const folderRef = ref(storage, `listingImages/${imagelocationname}`);
    deleteObject(folderRef).then(() => {
        console.log("deletion successful");
    }).catch((error) => {
        console.log("error deleting ")
    });

    return new Response("Lisitng Posted :)", {
        status: 200
    });
}
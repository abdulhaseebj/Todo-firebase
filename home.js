import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const form = document.querySelector('.form')
const input = document.querySelector('.todo-inp')
const logout = document.querySelector('.logout')


// user login or signup
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
        });
        getDataFromFirestore(uid);
    } else {
        window.location = 'index.html'
    }
});



// signout function

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location = 'index.html'

    }).catch((error) => {
        console.log(error);
    });

})

// add data on firstore
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log(input.value);
    try {
        const docRef = await addDoc(collection(db, "todo"), {
            uid: auth.currentUser.uid,
            todo: input.value,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
})
// get data from firestore

async function getDataFromFirestore(uid) {
    const q = query(collection(db, "todo"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
    });

}
// getDataFromFirestore()






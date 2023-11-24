import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


const form = document.querySelector('.form');
const input = document.querySelector('.todo-inp');
const logout = document.querySelector('.logout');
const userRen = document.querySelector('.user-ren');
const render = document.querySelector('.render');


// user login or signup
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            userRen.innerHTML = `${doc.data().name}`
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

// render data from firebase


const arr = [];

function renderPost() {
    render.innerHTML = ''
    arr.map((item) => {
        render.innerHTML += `
        <div class='flex justify-between mt-6 items-center'>
                <li>${item.todo}</li>
             <div class='flex justify-center gap-1'>
             <button type="button" id="delete" class="btn btn-danger">Delete</button>
                <button type="button" id="update" class="btn btn-info">Edit</button>
             </div>
         </div>
        `
    })

    const del = document.querySelectorAll('#delete');
    const upd = document.querySelectorAll('#update');

    del.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            console.log('delete called', arr[index]);
            await deleteDoc(doc(db, "todo", arr[index].docId))
                .then(() => {
                    console.log('post deleted');
                    arr.splice(index, 1);
                    renderPost()
                });
        })
    })
    upd.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            console.log('update called', arr[index]);
            const updatedTitle = prompt('enter new Title');
            await updateDoc(doc(db, "todo", arr[index].docId), {
                todo: updatedTitle
            });
            arr[index].todo = updatedTitle;
            renderPost()

        })
    })
}

// get data from firestore

async function getDataFromFirestore(uid) {
    arr.length = 0
    const q = query(collection(db, "todo"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        // arr.push(doc.data())
        arr.push({ ...doc.data(), docId: doc.id });
    });
    renderPost()
}

// add data on Firestore
// form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     console.log(input.value);
//     try {
//         const docRef = await addDoc(collection(db, "todo"), {
//             uid: auth.currentUser.uid,
//             todo: input.value,
//         });
//         console.log("Document written with ID: ", docRef.id);

//         // Update local array and render after adding data
//         arr.push({ uid: auth.currentUser.uid, todo: input.value, docId: docRef.id });
//         renderPost();

//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
//     input.value = '';
// });

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
        arr.push({ uid: auth.currentUser.uid, todo: input.value, docId: docRef.id });
        renderPost()

    } catch (e) {
        console.error("Error adding document: ", e);
    }
    input.value = ''
});
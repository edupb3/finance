
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getFirestore, collection, query, getDocs, doc, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBIso7UmCqgnWcItoDZkMu-CenQRQjniMk",
  authDomain: "testing-firebase-4b0af.firebaseapp.com",
  projectId: "testing-firebase-4b0af",
  storageBucket: "testing-firebase-4b0af.appspot.com",
  messagingSenderId: "274395585361",
  appId: "1:274395585361:web:4f030750b01906e91ad170",
  measurementId: "G-VFDCEVMPV7"
};
//const transactionsUl = document.querySelector("#transactions");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// async function getTransactions(db) {
//     const transactionsCol = collection(db, 'transactions');
//     const transactionSnapshot = await getDocs(transactionsCol);
//     const transactionsList = transactionSnapshot.docs.map(doc => doc.data());

//     transactionsList.forEach(item => {
//       const li = document.createElement('li')
//         li.classList.add('plus');
    
//         //const d = item.createdAt.toDate().toDateString()
//         const d = item.amount
//         li.innerHTML = `
//           ${item.name} <span> ${d} </span> 
//           <button class="delete-btn" >
//               x
//           </button>
//         `
//         transactionsUl.prepend(li);  
//     })
//     return transactionsList;
//   }

//const firestore = getTransactions(db);
  
export {db, collection,query, getDocs, doc, addDoc, onSnapshot};
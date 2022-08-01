// import fetch  from "node-fetch"
// async function ontraportUserExists(email){
//     const options = { method: "GET", headers: {'Content-Type': 'application/json','Api-Key':'V6sDw7GHFeBajNH','Api-Appid':'2_145547_pAwo2CYIi'}};
//     try{
//         let response = await fetch(
//             `https://api.ontraport.com/1/Contacts?condition=[{
//                 "field":{"field":"email"},
//                 "op":"=",
//                 "value":{"value":"${email}"}
//             }]`,
//             options
//         );
//         response = await response.json();
//         return response.data.length? response.data[0].id: false
//     }catch(error){
//         return false
//     }
// }

// async function get_data(email){
//     const options = { method: "GET", headers: {'Content-Type': 'application/json','Api-Key':'V6sDw7GHFeBajNH','Api-Appid':'2_145547_pAwo2CYIi'}};
//     try{
//         let response = await fetch(
//             `https://api.ontraport.com/1/Contacts?condition=[{
//                 "field":{"field":"email"},
//                 "op":"=",
//                 "value":{"value":"${email}"}
//             }]`,
//             options
//         );
//         response = await response.json();
//         return response.data.length? response.data[0]: false
//     }catch(error){
//         return false
//     }
// }

// async function ontraportUpdateRecord(contactId, discordhandle){
//     const options = { method: "PUT", headers: {'Content-Type': 'application/x-www-form-urlencoded','Api-Key':'V6sDw7GHFeBajNH','Api-Appid':'2_145547_pAwo2CYIi'}, body: new URLSearchParams({
//         'id': contactId,
//         'f1999': discordhandle
//     })};
//     try{
//         let response = await fetch(
//             `https://api.ontraport.com/1/Contacts`,
//             options
//         );
//         response = await response.json();
//         console.log(true)
//     }catch(error){
//         console.log(error)
//     }
// }

// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, child, get, push } from "firebase/database";


// const firebaseConfig = {
//     apiKey: "AIzaSyASgBHeal29wpEisqKy2sXCnHlgQjKXJeM",
//     authDomain: "instituteforradicalpermissio.firebaseapp.com",
//     databaseURL: "https://instituteforradicalpermissio-default-rtdb.firebaseio.com",
//     projectId: "instituteforradicalpermissio",
//     storageBucket: "instituteforradicalpermissio.appspot.com",
//     messagingSenderId: "262424929901",
//     appId: "1:262424929901:web:874dba3e79ef827ffc0164",
//     measurementId: "G-EEBD0B48S2"
//   }

// const app = initializeApp(firebaseConfig);
// const db = getDatabase();
// const dbRef = ref(db);

// let snapshot = await get(child(dbRef, `users`))
// let data = Object.values(snapshot.val())
// console.log(data.length)
// // for(let record of data) {
// //     let ontraportContact = await ontraportUserExists(record.email)
// //     await ontraportUpdateRecord(ontraportContact, record.discordUname)
// //     console.log(`updated: ${record.email} | ${record.discordUname}`, )
// // }

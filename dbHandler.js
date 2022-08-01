const { initializeApp } = require("firebase/app");
const { getDatabase, ref, child, get, push } = require("firebase/database");
const firebaseConfig = require("./dbCreds.json")



const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db);


const addRecord = async (email, discordUname, discordUid) => {
    try {
        await push(ref(db, `users`), {email, discordUname, discordUid})
        return true
    }
    catch(error) {
        console.log(error)
        return false
    }
    
}

const getDiscordUid = async (email) => {
    let snapshot = await get(child(dbRef, `users`))
    if (snapshot.exists()) {
        let data = snapshot.val()
        data = Object.values(data)
        data = data.filter(record => record.email === email)
        if(!data.length) return false
        else return data[0].discordUid
    }
    else return false
}

const userExists = async (email) => {
    let snapshot = await get(child(dbRef, `registerdUsers`))
    if (snapshot.exists()) {
        let data = snapshot.val()
        data = data.filter(_email => _email === email)
        return Boolean(data.length)
    }
    else return false
}


module.exports = {addRecord, getDiscordUid, userExists}

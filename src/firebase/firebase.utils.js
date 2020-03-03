import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCJonaPukm7CSVp7BLllpD1Pj-vviMDKMU",
    authDomain: "learningshop-e3e47.firebaseapp.com",
    databaseURL: "https://learningshop-e3e47.firebaseio.com",
    projectId: "learningshop-e3e47",
    storageBucket: "learningshop-e3e47.appspot.com",
    messagingSenderId: "244143207296",
    appId: "1:244143207296:web:c6f41a0410914e0e99c765",
    measurementId: "G-C6SSHYSE75"
  };

  export const createUserProfileDocument = async (userAuth, additionalData)=>{
    if(!userAuth) return
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()
    if(!snapShot.exists){
        const {displayName, email} = userAuth
        const createdAt = new Date()
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error){
            console.log('error creating user', error.message)
        }
    }
    return userRef
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({promt:'select_Account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
  } from 'firebase/auth';
  import { auth } from "./index";

  export const signInWithGoogle = async() => {
    const provider = new GoogleAuthProvider();
    try{
        await signInWithPopup(auth,provider);
    }catch(e){
        console.log(e)
    }
  }
  
  export const logout = (): Promise<void> => {
    return signOut(auth);
  };
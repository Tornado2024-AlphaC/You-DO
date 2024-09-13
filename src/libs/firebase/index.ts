// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth,GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTpcGmACBO5GexX_qQ-1DWanSIa2SLuMM",
  authDomain: "alphac-1532a.firebaseapp.com",
  projectId: "alphac-1532a",
  storageBucket: "alphac-1532a.appspot.com",
  messagingSenderId: "1038100392555",
  appId: "1:1038100392555:web:e06725e13736669ed9df2e"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
if (!getApps()?.length){
    initializeApp(firebaseConfig)
}

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // サインイン後のユーザー情報を返す
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error; // エラーを上層に投げる
  }
};

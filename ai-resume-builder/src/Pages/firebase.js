import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";  

const firebaseConfig = {
   apiKey: "AIzaSyBJRksvQ-Ob8tQG6auiCz8HAcIl0AT32Os",
  authDomain: "ai-resume-b9289.firebaseapp.com",
  projectId: "ai-resume-b9289",
  storageBucket: "ai-resume-b9289.firebasestorage.app",
  messagingSenderId: "153327667131",
  appId: "1:153327667131:web:f9e1882f0f1096b47ea69e",
  measurementId: "G-L0Z2DF8DE2"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app); 

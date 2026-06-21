import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB-5kHUMxm-zd_EbnzPF6HbGvSXGeL4GSQ",
  authDomain: "mobile-22332.firebaseapp.com",
  databaseURL: "https://mobile-22332-default-rtdb.firebaseio.com",
  projectId: "mobile-22332",
  storageBucket: "mobile-22332.firebasestorage.app",
  messagingSenderId: "515392071333",
  appId: "1:515392071333:web:17537a4d7f6a4e69734f4c",
  measurementId: "G-SYHTLC1H4W"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
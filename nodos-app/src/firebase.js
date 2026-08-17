import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "API_KEY_PLACEHOLDER",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "PROJECT_ID.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "PROJECT_ID.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "APP_ID"
};

export const isFirebaseConfigured = () => {
  return (
    import.meta.env.VITE_FIREBASE_PROJECT_ID &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID !== "PROJECT_ID"
  );
};

let app = null;
let db = null;

try {
  if (isFirebaseConfigured()) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("🔥 Firebase inicializado correctamente");
  } else {
    console.warn("⚠️ Firebase no está configurado aún. Se utilizará el modo simulación local (Mock).");
  }
} catch (error) {
  console.error("Error al inicializar Firebase:", error);
}

export { db };

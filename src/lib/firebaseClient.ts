// src/lib/firebaseClient.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

let app: FirebaseApp;
let db: Firestore;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  ...(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    ? { measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID }
    : {}),
};

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

db = getFirestore(app);

export { app, db };

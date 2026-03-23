import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";

function requiredEnv(key: string): string {
  const value = import.meta.env[key];
  if (typeof value !== "string" || value === "") {
    throw new Error(
      `Missing ${key}. Copy .env.example to .env and set your Firebase values.`,
    );
  }
  return value;
}

const firebaseConfig = {
  apiKey: requiredEnv("VITE_FIREBASE_API_KEY"),
  authDomain: requiredEnv("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: requiredEnv("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: requiredEnv("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: requiredEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: requiredEnv("VITE_FIREBASE_APP_ID"),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const app: FirebaseApp = initializeApp(firebaseConfig);

export const analytics: Analytics | undefined =
  typeof firebaseConfig.measurementId === "string" &&
  firebaseConfig.measurementId !== ""
    ? getAnalytics(app)
    : undefined;

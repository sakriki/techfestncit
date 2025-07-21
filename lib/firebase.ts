"use client"

import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCzGc4r-zVVxnRPd_04h-IBiUnDGUr-1s8",
  authDomain: "gafadi-saksham.firebaseapp.com",
  projectId: "gafadi-saksham",
  storageBucket: "gafadi-saksham.firebasestorage.app",
  messagingSenderId: "310831924857",
  appId: "1:310831924857:web:23ed09f770ff7e374f36a8",
  measurementId: "G-16P1RVHPQH",
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage }

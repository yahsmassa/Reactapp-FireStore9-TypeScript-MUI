// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  QueryDocumentSnapshot,
  DocumentData,
  Query,
  onSnapshot,
} from "firebase/firestore";
import { MedicalModel } from "../types/MedicalModel";
import Swal from "sweetalert2";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionName = "medicalHistory";
export const collectionRef = collection(db, collectionName);

export const registerNewMedicalRecord = async (
  newMedicalRecord: MedicalModel
) => {
  try {
    await addDoc(collectionRef, newMedicalRecord);
    Swal.fire(
      "Good work!",
      "The medical record was successfully registered",
      "success"
    );
  } catch (error) {
    Swal.fire("¡Upps!", "Something went wrong", "error");
  }
};

export const deleteMedicalRecord = async (id: string) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    Swal.fire("Deleted !", "The medical record was successfully deleted");
  } catch (error) {
    Swal.fire("¡Upps!", "Something went wrong", "error");
  }
};

export const editMedicalRecord = async (
  editMedicalRecord: MedicalModel,
  id: string
) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, { ...editMedicalRecord });
    Swal.fire("Revised !", "The medical record was successfully revised");
  } catch (error) {
    Swal.fire("¡Upps!", "Something went wrong", "error");
  }
};

export const getMedicalRecords = async (q: Query<DocumentData>) => {
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as MedicalModel)
    );
  } catch (error) {
    Swal.fire("¡Upps!", "Something went wrong", "error");
    return [];
  }
};

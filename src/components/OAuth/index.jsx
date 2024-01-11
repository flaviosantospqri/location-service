import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../src/services/firebase";

const OAuth = () => {
  const navigate = useNavigate();
  const onGoogleClick = async () => {
    try {
      //Autenticando com o Google
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //Salvando no Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      user && navigate("/offers");
    } catch (error) {
      toast.error("No authorized");
    }
  };
  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="flex w-full items-center justify-center bg-red-500 py-3 rounded text-white px-7 text-sm font-medium uppercase hover:bg-red-700 active:bg-red-900 hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
    >
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
      Continue With Google
    </button>
  );
};

export default OAuth;

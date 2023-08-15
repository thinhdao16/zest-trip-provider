import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import axios from "axios";

interface User {
  email: string | null; // Update the type of 'email' property to include 'null'
  // Add other properties as needed
}

interface AuthContextValue {
  googleSignIn: () => Promise<void>;
  accessToken: string;
  abc : string
}

export const DataContext = createContext<AuthContextValue>({} as AuthContextValue);

export function DataContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const abc = "abe"
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const users = result.user;
    const token = await users.getIdToken();
    setAccessToken(token);
    setUser(users);
  };

  const logOut = () => {
    signOut(auth);
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email) {
        currentUser.getIdToken().then((token) => {
          setAccessToken(token);
        });
      }
    });


    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <DataContext.Provider value={{ googleSignIn, accessToken , abc }}>
      {children}
    </DataContext.Provider>
  );
}

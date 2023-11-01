import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

interface User {
  email: string | null; // Update the type of 'email' property to include 'null'
  // Add other properties as needed
}
type RefeshLogin = boolean;
type RefeshTour = boolean;
type RefeshTourDetail = boolean;

interface AuthContextValue {
  googleSignIn: () => Promise<void>;
  accessToken: string;
  abc: string;
  refeshLogin: RefeshLogin | null;
  setRefeshLogin: React.Dispatch<React.SetStateAction<RefeshLogin | null>>;
  refeshTour: RefeshTour | null;
  setRefeshTour: React.Dispatch<React.SetStateAction<RefeshTour | null>>;
  refreshTourDetail: RefeshTourDetail | null;
  setRefreshTourDetail: React.Dispatch<
    React.SetStateAction<RefeshTourDetail | null>
  >;
}

export const DataContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const [refeshLogin, setRefeshLogin] = useState<RefeshLogin | null>(null);
  const [refeshTour, setRefeshTour] = useState<RefeshTour | null>(null);
  const [refreshTourDetail, setRefreshTourDetail] =
    useState<RefeshTourDetail | null>(null);
  const abc = "abe";
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const users = result.user;
    const token = await users.getIdToken();
    setAccessToken(token);
    setUser(users);
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
    <DataContext.Provider
      value={{
        googleSignIn,
        accessToken,
        abc,
        refeshLogin,
        setRefeshLogin,
        refeshTour,
        setRefeshTour,
        refreshTourDetail,
        setRefreshTourDetail,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

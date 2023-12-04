import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../../FirebaseConfig/Config";
import UseAxiosPublic from "../../Hookes/AxiosPublic/UseAxiosPublic";

export const Authcontext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  //Create User
  const handleCreateUser = async (email, password) => {
    setLoading(true);
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  //   Login User
  const handleLogin = async (email, password) => {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password);
  };

  //   Update User
  const handleUpdateUser = async (name, photoUrl) => {
    setLoading(true);
    return await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  //   Google Login
  const provider = new GoogleAuthProvider();
  const handleGLogin = async () => {
    setLoading(true);
    return await signInWithPopup(auth, provider);
  };

  //LogOut User
  const handleLogOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const axiosPublic = UseAxiosPublic();
  //On auth State Change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (CurrentUser) => {
      if (CurrentUser) {
        setUser(CurrentUser);
        await axiosPublic
          .post("/api/users", { email: CurrentUser.email })
          .then(async (res) => {
            // Token Send TO the Localhost
            if (res.data?.token) {
              localStorage.setItem("access_token", res.data.token);
              setLoading(false);
            }
            //Post User
            await axiosPublic.post("/api/users/create/user", {
              email: CurrentUser?.email,
              name: CurrentUser?.displayName,
            });
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access_token");
        setLoading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);
  const authInfo = {
    user,
    loading,
    handleCreateUser,
    handleLogin,
    handleUpdateUser,
    handleGLogin,
    handleLogOut,
  };
  return (
    <Authcontext.Provider value={authInfo}>{children}</Authcontext.Provider>
  );
};

export default AuthProvider;

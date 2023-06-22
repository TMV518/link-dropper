import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase/firebase-config.js";
import { useState, useEffect } from "react";
import { db } from "./firebase/firebase-config.js";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import classes from "./UserAuthPage.module.css";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes } from "firebase/storage";
import { storageRef } from "./firebase/firebase-config";

const UserAuthPage = () => {
  //AUTHENTICATION
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [signUpPage, setSignUpPage] = useState(true);
  const [loginPage, setLoginPage] = useState(false);

  const signUpPageHandler = () => {
    setSignUpPage(true);
    setLoginPage(false);
  };

  const loginPageHandler = () => {
    setLoginPage(true);
    setSignUpPage(false);
  };

  //current user
  const [user, setUser] = useState("");

  //sets error text
  const [errorText, setErrorText] = useState("");

  const navigate = useNavigate();

  //onAuthStateChanged() is like useEffect()
  //It is run when the auth state changes
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(auth.currentUser);
    });
  }, []);

  const userProfileDbRef = collection(db, "users");

  //creating the default profile upon account creation
  const createProfile = async (user) => {
    //creating user profile page
    const defaultProfile = {
      title: "My Links",
      linkList: [
        { name: "Link 1", link: "", key: uuid() },
        { name: "Link 2", link: "", key: uuid() },
        { name: "Link 3", link: "", key: uuid() },
      ],
      bgColor: "white",
      fontFamily: "Times New Roman",
      textColor: "black",
      profilePic: `${auth.currentUser.uid}.png`,
      profileRadius: "50%",
      borderStyle: "none",
    };

    //creating new user document with the name being the uid
    await setDoc(doc(userProfileDbRef, user.uid), defaultProfile);

    //adding profile pic
    //getting reference to database
    //storage ref used for images

    const newPicRef = ref(
      storageRef,
      `profile-pics/${user.uid}/${user.uid}.PNG`
    );
    uploadBytes(
      newPicRef,
      new File([], `${user.uid}.PNG`, {
        type: "image/png",
      })
    );
  };
  //creates user account
  const signUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      setErrorText("");
      const user = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      );

      console.log("UID:", auth.currentUser.uid);
      createProfile(auth.currentUser);

      //navigate to the user's page upon login
      navigate(`../user/${auth.currentUser.uid}`);
    } catch (error) {
      console.log(error.message);
      console.log("error.code: " + error.code);
      switch (error.code) {
        case "auth/email-already-in-use": {
          console.log("400 ERROR");
          setErrorText("Email already in use");
          break;
        }
        case "auth/invalid-email": {
          setErrorText("Enter a valid email");
          break;
        }
      }
    }

    setLoading(false);
  };

  //logs user in user account
  const login = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorText("");
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      //navigate to the user's page upon login
      navigate(`../user/${auth.currentUser.uid}`);
    } catch (error) {
      console.log(error.message);
      console.log("error.code: " + error.code);
      switch (error.code) {
        case "auth/user-not-found": {
          setErrorText("Email/password combination not found");
          break;
        }
        case "auth/invalid-email": {
          setErrorText("Enter a valid email");
          break;
        }
        case "auth/wrong-password": {
          setErrorText("Email/Password combination does not match an account");
          break;
        }
        case "auth/missing-password": {
          setErrorText("Enter a valid password");
          break;
        }
      }
    }
    setLoading(false);
  };

  //handles logging out
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className={classes["auth__wrapper"]}>
      <h1>Link Dropper</h1>
      <div className={classes["auth-box"]}>
        <h2>Sign In</h2>
        <div className={classes["top-buttons"]}>
          <button
            style={{
              borderBottom: signUpPage ? "1px solid blue" : "none",
            }}
            onClick={signUpPageHandler}
          >
            Sign Up
          </button>
          <button
            onClick={loginPageHandler}
            style={{
              borderBottom: loginPage ? "1px solid blue" : "none",
            }}
          >
            Login
          </button>
        </div>

        {signUpPage && (
          <>
            <p>Sign Up</p>
            <form
              className={classes["signup__wrapper"]}
              onSubmit={(e) => {
                signUp(e);
              }}
            >
              <input
                type="text"
                placeholder="E-Mail"
                id="e-mail__signup"
                onChange={(e) => {
                  setSignUpEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                id="password__signup"
                onChange={(e) => {
                  setSignUpPassword(e.target.value);
                }}
              />
              <button type="submit">Submit</button>
            </form>
          </>
        )}

        {loginPage && (
          <>
            <p>Log In</p>
            <form
              onSubmit={(e) => {
                login(e);
              }}
              className={classes["login__wrapper"]}
            >
              <input
                type="text"
                placeholder="E-Mail"
                id="e-mail__login"
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                id="password__login"
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              />
              <button type="submit">Submit</button>
            </form>
          </>
        )}
      </div>
      {loading && <div className={classes["auth__overlay"]}></div>}

      <p>{errorText}</p>
      <p>Currently logged-in user: {user?.email}</p>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default UserAuthPage;

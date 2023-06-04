import classes from "./App.module.css";
import { useEffect, useRef, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

import EditPage from "./edit components/EditPage";
import { useSelector } from "react-redux";

import EditLinks from "./edit components/EditLinks";
import EditTitle from "./edit components/EditTitle";
import EditTextBorder from "./edit components/EditTextBorder";
import EditProfileRadius from "./edit components/EditProfileRadius";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import EditFontFamily from "./edit components/EditFontFamily";
import { db } from "./firebase/firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase/firebase-config.js";

function App() {
  //custom hook from react-color-palette
  //Made by Wondermarin on Github
  //https://github.com/Wondermarin/react-color-palette
  const [color, setColor] = useColor("hex", "#e26161");

  const [profile, setProfile] = useState();

  const profileRef = collection(db, "test");
  //test function to fetch from database
  const getProfileProps = async () => {
    try {
      const data = await getDocs(profileRef);
      //console.log(data.docs);
      setProfile(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error.message);
    }
  };

  const [profileColor, setProfileColor] = useState("white");

  useEffect(() => {
    try {
      console.log(profile[0]);
      setProfileColor(profile[0].bgColor);
    } catch (error) {
      console.log(error.message);
    }
  }, [profile]);

  const title = useSelector((state) => state.title.title);
  const fontFamily = useSelector((state) => state.fontFamily.fontFamily);
  const borderStyle = useSelector((state) => state.borderStyle.borderStyle);
  const profileRadius = useSelector(
    (state) => state.profileRadius.profileRadius
  );
  const linkList = useSelector((state) => state.linkList.linkList);

  //AUTHENTICATION
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //current user
  const [user, setUser] = useState("");

  //sets error text
  const [errorText, setErrorText] = useState("");

  //onAuthStateChanged() is like useEffect()
  //It is run when the auth state changes
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(auth.currentUser);
    });
  }, []);

  //creates user account
  const signUp = async (event) => {
    event.preventDefault();
    try {
      setErrorText("");
      const user = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      );
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
  };

  //logs user in user account
  const login = async (event) => {
    event.preventDefault();
    setErrorText("");
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
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
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className={classes["app-wrapper"]}>
      <p>Sign Up</p>
      <form
        onSubmit={(e) => {
          signUp(e);
        }}
      >
        <input
          type="text"
          placeholder="username"
          id="username__signup"
          onChange={(e) => {
            setSignUpEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          id="password__signup"
          onChange={(e) => {
            setSignUpPassword(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      <p>Log In</p>
      <form
        onSubmit={(e) => {
          login(e);
        }}
      >
        <input
          type="text"
          placeholder="username"
          id="username__login"
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          id="password__login"
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{errorText}</p>
      <p>Currently logged-in user: {user?.email}</p>
      <button onClick={logout}>Log Out</button>

      <Router>
        <Link to="edit">
          <button>Edit</button>
        </Link>
        <button onClick={getProfileProps}>Fetch</button>

        <Routes>
          <Route exact path="edit" element={<EditPage />} />
          <Route path="edit/title" element={<EditTitle />} />
          <Route path="edit/links" element={<EditLinks />} />
          <Route path="edit/font" element={<EditFontFamily />} />
          <Route path="edit/profile-shape" element={<EditProfileRadius />} />
          <Route path="edit/text-border" element={<EditTextBorder />} />
        </Routes>
      </Router>

      <div
        className={classes["profile-wrapper"]}
        style={{ backgroundColor: profileColor, fontFamily: fontFamily }}
      >
        <img
          className={classes["profile-photo"]}
          alt="profile_photo"
          src={require("./assets/penguin_placeholder.png")}
          style={{ borderRadius: profileRadius }}
        />
        <h1>{title}</h1>
        <ul>
          {linkList.map((linkObj) => {
            return (
              <li key={linkObj.key} style={{ borderStyle: borderStyle }}>
                <a href={linkObj.link}>{linkObj.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;

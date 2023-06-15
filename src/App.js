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
import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase/firebase-config.js";
import UserAuthPage from "./UserAuthPage";
import UserProfile from "./UserProfile";

function App() {
  //custom hook from react-color-palette
  //Made by Wondermarin on Github
  //https://github.com/Wondermarin/react-color-palette
  const [color, setColor] = useColor("hex", "#e26161");

  const [profile, setProfile] = useState();

  const profileRef = collection(db, "test");

  //profile state variables
  const [profileColor, setProfileColor] = useState("white");

  useEffect(() => {
    try {
      console.log(profile[0]);
      setProfileColor(profile[0].bgColor);
    } catch (error) {
      console.log(error.message);
    }
  }, [profile]);

  const id = useSelector((state) => state.uid.uid);

  const title = useSelector((state) => state.title.title);
  const fontFamily = useSelector((state) => state.fontFamily.fontFamily);
  const borderStyle = useSelector((state) => state.borderStyle.borderStyle);
  const profileRadius = useSelector(
    (state) => state.profileRadius.profileRadius
  );
  const linkList = useSelector((state) => state.linkList.linkList);

  //posts profile changes to firebase
  const postChanges = async () => {
    console.log("POST CHANGES");
    setProfile({
      title: title,
      linkList: linkList,
      bgColor: "red",
      fontFamily: fontFamily,
      textColor: "white",
      profilePic: "",
      profileRadius: profileRadius,
      borderStyle: borderStyle,
    });
    console.log(profile);

    await setDoc(doc(db, "test", "profile"), {
      title: title,
      linkList: linkList,
      bgColor: "orange",
      fontFamily: "dunno let's fix this later",
      textColor: "white",
      profilePic: "",
      profileRadius: profileRadius,
      borderStyle: borderStyle,
    });
  };

  return (
    <div className={classes["app-wrapper"]}>
      <Router>
        <Link to={`user/${id}/edit`}>
          <button>Edit</button>
        </Link>

        <div className={classes["save-buttons"]}>
          <button className={classes.save} onClick={postChanges}>
            Save
          </button>
          <Link to={`user/${id}`}>
            <button className={classes.discard}>Discard</button>
          </Link>
        </div>

        <Routes>
          <Route exact path="auth" element={<UserAuthPage />} />
          <Route exact path="user/:id/edit" element={<EditPage />} />
          <Route path="user/:id/edit/title" element={<EditTitle />} />
          <Route path="user/:id/edit/links" element={<EditLinks />} />
          <Route path="user/:id/edit/font" element={<EditFontFamily />} />
          <Route
            path="user/:id/edit/profile-shape"
            element={<EditProfileRadius />}
          />
          <Route
            path="user/:id/edit/text-border"
            element={<EditTextBorder />}
          />
          <Route path="signin" element={<UserAuthPage />} />
          <Route path="user/:id" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

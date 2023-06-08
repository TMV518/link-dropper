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
      borderStyle: borderStyle
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
      borderStyle: borderStyle
    });

  }

  return (
    <div className={classes["app-wrapper"]}>
      <UserAuthPage />
      <Router>
        <Link to="edit">
          <button>Edit</button>
        </Link>
        <button onClick={getProfileProps}>Fetch</button>

        <div className={classes["save-buttons"]}>
          <button className={classes.save} onClick={postChanges}>Save</button>
          <button className={classes.discard}>Discard</button>
        </div>

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

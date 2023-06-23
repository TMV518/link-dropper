import classes from "./App.module.css";
import { useEffect, useRef, useState } from "react";
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
import CustomColorPicker from "./reusable components/CustomColorPicker";
import EditBgColor from "./edit components/EditBgColor";
import EditTextColor from "./edit components/EditTextColor";
import NotFound from "./NotFound";
import EditProfilePic from "./edit components/EditProfilePic";

function App() {
  const [profile, setProfile] = useState();

  const profileRef = collection(db, "test");

  //profile state variables
  const [profileColor, setProfileColor] = useState("white");

  useEffect(() => {
    // try {
    //   console.log(profile[0]);
    //   setProfileColor(profile[0].bgColor);
    // } catch (error) {
    //   console.log(error.message);
    // }
    userLoggedIn();
  }, []);

  const id = useSelector((state) => state.uid.uid);

  // const title = useSelector((state) => state.title.title);
  // const fontFamily = useSelector((state) => state.fontFamily.fontFamily);
  // const borderStyle = useSelector((state) => state.borderStyle.borderStyle);
  // const profileRadius = useSelector(
  //   (state) => state.profileRadius.profileRadius
  // );
  // const linkList = useSelector((state) => state.linkList.linkList);

  const [editing, setEditing] = useState(false);

  //auth checks
  const userLoggedIn = () => {
    let user = auth.currentUser;
    console.log(user);
  };

  return (
    <div className={classes["app-wrapper"]}>
      <Router>
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
          <Route path="user/:id/edit/bg-color" element={<EditBgColor />} />
          <Route path="user/:id/edit/text-color" element={<EditTextColor />} />
          <Route
            path="user/:id/edit/profile-pic"
            element={<EditProfilePic />}
          />
          <Route path="signin" element={<UserAuthPage />} />
          <Route path="user/:id" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

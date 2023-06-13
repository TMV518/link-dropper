import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { db } from "./firebase/firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import classes from "./App.module.css";
const UserProfile = () => {
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
  return (
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
  );
};

export default UserProfile;

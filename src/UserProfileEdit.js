import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { db, storageRef } from "./firebase/firebase-config.js";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import classes from "./UserProfile.module.css";
import { ref, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uidActions } from "./store/index.js";

const UserProfileEdit = (props) => {
  //custom hook from react-color-palette
  //Made by Wondermarin on Github
  //https://github.com/Wondermarin/react-color-palette
  const [color, setColor] = useColor("hex", "#e26161");

  //using selector to fill in stored data
  const title = useSelector((state) => state.title.title);
  const linkList = useSelector((state) => state.linkList.listList);
  //const bgColor = useSelector((state) => state.bgColor.bgColor);
  const fontFamily = useSelector((state) => state.fontFamily.fontFamily);
  //const textColor = useSelector((state) => state.textColor.textColor);
  const profilePic = useSelector((state) => state.profilePic.profilePic);
  const profileRadius = useSelector(
    (state) => state.profileRadius.profileRadius
  );
  const borderStyle = useSelector((state) => state.borderStyle.borderStyle);

  const dispatch = useDispatch();

  //used to get profile data through database
  //id parameter from URL
  const { id } = useParams();

  //setting UID in storage for URL purposes
  useEffect(() => {
    dispatch(uidActions.setUID(id));
  }, []);

  const userPofileRef = doc(db, "users", id);
  //const [editUserObj, setEditUserObj] = useState({});

  //storage ref used for images
  const picsRef = ref(storageRef, "profile-pics");

  return (
    <div
      className={classes["profile-wrapper"]}
      style={{
        backgroundColor: "brown",
        fontFamily: fontFamily,
        color: "black",
      }}
    >
      <img
        className={classes["profile-photo"]}
        alt="profile_photo"
        src=""
        style={{ borderRadius: profileRadius }}
      />
      <h1>{title}</h1>
      <ul>
        {linkList?.map((linkObj) => {
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

export default UserProfileEdit;

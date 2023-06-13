import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { db, storageRef } from "./firebase/firebase-config.js";
import { collection, getDocs, getDoc } from "firebase/firestore";
import classes from "./UserProfile.module.css";
import { ref, getDownloadURL } from "firebase/storage";

const UserProfile = (props) => {
  //custom hook from react-color-palette
  //Made by Wondermarin on Github
  //https://github.com/Wondermarin/react-color-palette
  const [color, setColor] = useColor("hex", "#e26161");

  const [profile, setProfile] = useState();

  const profileRef = collection(db, "test");
  //test function to fetch from database
  //   const getProfileProps = async () => {
  //     try {
  //       const data = await getDocs(profileRef);
  //       //console.log(data.docs);
  //       setProfile(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  const [profileColor, setProfileColor] = useState("white");

  useEffect(() => {
    try {
      getProfile();
      console.log(profile[0]);
      setProfileColor(profile[0].bgColor);
    } catch (error) {
      console.log(error.message);
    }
  }, [profile]);

  //   const title = useSelector((state) => state.title.title);
  //   const fontFamily = useSelector((state) => state.fontFamily.fontFamily);
  //   const borderStyle = useSelector((state) => state.borderStyle.borderStyle);
  //   const profileRadius = useSelector(
  //     (state) => state.profileRadius.profileRadius
  //   );
  //   const linkList = useSelector((state) => state.linkList.linkList);

  //used to get profile data through database based off uid
  const userPofileRef = collection(db, "users");
  const [userObj, setUserObj] = useState({});

  //storage ref used for images
  const picsRef = ref(storageRef);

  const getProfile = async () => {
    try {
      console.log("UID:", props.uid);
      console.log(userPofileRef);
      const userDoc = await getDocs(userPofileRef, props.uid);
      const userObjRef = userDoc.docs[1]._document.data.value.mapValue.fields;
      const iconRef = await getDownloadURL(
        ref(picsRef, userObjRef.profilePic.stringValue)
      );
      setUserObj({
        bgColor: userObjRef.bgColor.stringValue,
        borderStyle: userObjRef.borderStyle.stringValue,
        fontFamily: userObjRef.fontFamily.stringValue,
        linkList: userObjRef.linkList.arrayValue.values,
        profilePic: iconRef,
        profileRadius: userObjRef.profileRadius.stringValue,
        textColor: userObjRef.textColor.stringValue,
        title: userObjRef.title.stringValue,
      });
      console.log("Profile props:", userObjRef);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={classes["profile-wrapper"]}
      style={{
        backgroundColor: userObj.bgColor,
        fontFamily: userObj.fontFamily,
        color: userObj.textColor,
      }}
    >
      <img
        className={classes["profile-photo"]}
        alt="profile_photo"
        src={userObj.profilePic}
        style={{ borderRadius: userObj.profileRadius }}
      />
      <h1>{userObj.title}</h1>
      <ul>
        {userObj.linkList?.map((linkObj) => {
          return (
            <li
              key={linkObj.mapValue.fields.key.stringValue}
              style={{ borderStyle: userObj.borderStyle }}
            >
              <a href={linkObj.mapValue.fields.link.stringValue}>
                {linkObj.mapValue.fields.name.stringValue}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserProfile;

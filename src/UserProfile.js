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

const UserProfile = (props) => {
  //custom hook from react-color-palette
  //Made by Wondermarin on Github
  //https://github.com/Wondermarin/react-color-palette
  const [color, setColor] = useColor("hex", "#e26161");

  const dispatch = useDispatch();

  //used to get profile data through database
  //id parameter from URL
  const { id } = useParams();

  //setting UID in storage for URL purposes
  useEffect(() => {
    dispatch(uidActions.setUID(id));
    try {
      getProfile();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const userPofileRef = doc(db, "users", id);
  const [userObj, setUserObj] = useState({});

  //storage ref used for images
  const picsRef = ref(storageRef, "profile-pics");

  const [pageDNE, setPageDNE] = useState(false);
  const [loading, setLoading] = useState(false);

  //fetches the profile data
  const getProfile = async () => {
    try {
      setLoading(true);
      console.log("UID:", id);
      console.log(userPofileRef);
      const userDoc = await getDoc(userPofileRef);
      if (userDoc.exists()) {
        console.log("Document data:", userDoc.data());

        // const iconRef = await getDownloadURL(ref(picsRef + "-profile.PNG"));
        setUserObj(userDoc.data());
      } else {
        // userDoc.data() will be undefined in this case
        setPageDNE(true);
        throw new Error("User does not exist");
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  //checking if loading
  if (loading) {
    return <p>Loading...</p>;
  }
  //checking if page exists
  if (!pageDNE) {
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
                key={linkObj.key}
                style={{ borderStyle: userObj.borderStyle }}
              >
                <a href={linkObj.link}>{linkObj.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <p>User not found</p>;
  }
};

export default UserProfile;

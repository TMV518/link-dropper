import { useEffect, useRef, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { db, storageRef } from "./firebase/firebase-config.js";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import classes from "./UserProfile.module.css";
import { ref, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uidActions } from "./store/index.js";

//dispatch actions
import { titleActions } from "./store/index.js";

const UserProfile = (props) => {
  const dispatch = useDispatch();

  //getting this to let UserProfile know when redux state changes
  /*this is used in useEffect() and allows page to refresh when profile
  changes are made*/
  const profileState = useSelector((state) => state);

  //used to get profile data through database
  //id parameter from URL
  const { id } = useParams();

  //setting UID in storage for URL purposes
  useEffect(() => {
    dispatch(uidActions.setUID(id));
    //sending variables to store
    dispatch(titleActions.setTitle(userObj.title));
    try {
      getProfile();
    } catch (error) {
      console.log(error.message);
    }
  }, [profileState]);

  const userProfileRef = doc(db, "users", id);
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
      console.log(userProfileRef);
      const userDoc = await getDoc(userProfileRef);
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
              <li key={linkObj.key}>
                <a href={linkObj.link}>
                  <button
                    style={{
                      borderStyle: userObj.borderStyle,
                      fontFamily: userObj.fontFamily,
                    }}
                  >
                    {linkObj.name}
                  </button>
                </a>
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

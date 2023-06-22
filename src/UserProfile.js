import { useEffect, useRef, useState } from "react";
import { db, storageRef } from "./firebase/firebase-config.js";
import { getDoc, doc } from "firebase/firestore";
import classes from "./UserProfile.module.css";
import { ref, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uidActions } from "./store/index.js";
import { Link } from "react-router-dom";
import { collection } from "firebase/firestore";
import { auth } from "./firebase/firebase-config.js";
import { signOut } from "firebase/auth";

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
        //retreiving document data
        console.log("Document data:", userDoc.data());

        //setting profile pic
        const iconRef = await getDownloadURL(ref(picsRef, `${id}/${id}.PNG`));

        setUserObj({ ...userDoc.data(), profilePic: iconRef });
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
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }
  //checking if page exists
  if (!pageDNE) {
    return (
      <div style={{ backgroundColor: userObj.bgColor, height: "100vh" }}>
        {/*if logged in user id === profile id, then display edit button */}
        {auth?.currentUser?.uid === id && (
          <>
            <button
              className={classes["sign-out-button"]}
              onClick={async () => {
                await signOut(auth);
              }}
            >
              Sign Out
            </button>
            <br />
            <br />
            <Link to={`../user/${id}/edit`}>
              <button className={classes["top-left-button"]}>Edit</button>
            </Link>
          </>
        )}
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
          <ul className={classes["link-item__list"]}>
            {userObj.linkList?.map((linkObj) => {
              return (
                <li key={linkObj.key} className={classes["link-item"]}>
                  <a href={linkObj.link}>
                    <button
                      style={{
                        borderStyle: userObj.borderStyle,
                        fontFamily: userObj.fontFamily,
                        color: userObj.textColor,
                        borderColor: userObj.textColor,
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
      </div>
    );
  } else {
    return <p>User not found</p>;
  }
};

export default UserProfile;

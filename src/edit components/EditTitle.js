import { useDispatch, useSelector } from "react-redux";
import CoverPage from "../reusable components/CoverPage";
import { titleActions } from "../store/index";
import { useState } from "react";
import UserProfile from "../UserProfile";
import UserProfileEdit from "../UserProfileEdit";
import { db } from "../firebase/firebase-config.js";
import { doc, updateDoc, setDoc, collection } from "firebase/firestore";
const EditTitle = () => {
  const title = useSelector((state) => state.title.title);
  const id = useSelector((state) => state.uid.uid);

  //getting reference to database
  const userProfileRef = doc(db, "users", id);

  //temp title used for onChange
  const [tempTitle, setTempTitle] = useState("");

  const dispatch = useDispatch();

  //changes the stored title
  const titleChangeHandler = async (event) => {
    event.preventDefault();
    try {
      await updateDoc(userProfileRef, { title: tempTitle });
    } catch (error) {
      console.log(error.message);
    }

    console.log(tempTitle);
    console.log(userProfileRef);
    dispatch(titleActions.setTitle(tempTitle));
  };

  return (
    <>
      <CoverPage>
        <form onSubmit={titleChangeHandler}>
          <input
            type="text"
            placeholder="Enter a title"
            onChange={(e) => {
              setTempTitle(e.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </CoverPage>
      <UserProfile />
    </>
  );
};

export default EditTitle;

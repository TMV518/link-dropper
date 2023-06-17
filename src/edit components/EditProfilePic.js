import CoverPage from "../reusable components/CoverPage";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import classes from "./EditProfilePic.module.css";
import { db } from "../firebase/firebase-config";
import { doc } from "firebase/firestore";
import { storageRef } from "../firebase/firebase-config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
const EditProfilePic = () => {
  //   const borderRadius = useSelector((state) => state.borderStyle.borderStyle);

  const [preview, setPreview] = useState(null);

  const id = useSelector((state) => state.uid.uid);
  const dispatch = useDispatch();

  //getting reference to database
  //const userProfileRef = doc(db, "users", id);
  //storage ref used for images
  const picsRef = ref(storageRef, "profile-pics");

  const uploadImageHandler = () => {
    if (preview == null) {
      alert('Either add a new image or click "X" to close');
    } else {
      try {
        uploadBytes(picsRef, id + "-profile.PNG").then(() => {
          alert("Image uploaded");
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <CoverPage>
      <button onClick={uploadImageHandler}>Save</button>
      <br />
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={(e) => {
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />
      <br />
      Note: 1x1 proportioned images work best
      <br />
      <img
        className={classes["image-preview"]}
        alt="Photo Preview"
        src={preview}
        style={{}}
      />
    </CoverPage>
  );
};

export default EditProfilePic;

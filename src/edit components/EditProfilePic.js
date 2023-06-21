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

  const uploadImageHandler = async () => {
    console.log(preview.name);
    if (preview == null) {
      alert('Either add a new image or click "X" to close');
    } else {
      try {
        //changing image name by creating new file object
        var blob = preview.slice(0, preview.size, "image/png");
        let newFile = new File([blob], `${id}.PNG`, {
          type: "image/png",
        });

        //getting reference to database
        //storage ref used for images
        const newPicRef = ref(storageRef, `profile-pics/${id}/${newFile.name}`);
        uploadBytes(newPicRef, newFile).then(() => {
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
          setPreview(e.target.files[0]);
        }}
      />
      <br />
      Note: 1x1 proportioned images work best
      <br />
      <img
        className={classes["image-preview"]}
        alt="Photo Preview"
        // src={URL.createObjectURL(preview)}
      />
    </CoverPage>
  );
};

export default EditProfilePic;

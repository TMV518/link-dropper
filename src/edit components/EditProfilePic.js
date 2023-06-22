import CoverPage from "../reusable components/CoverPage";
import { useSelector } from "react-redux";
import { useState } from "react";
import classes from "./EditProfilePic.module.css";
import { storageRef } from "../firebase/firebase-config";
import { ref, uploadBytes } from "firebase/storage";

const EditProfilePic = () => {
  const [upload, setUpload] = useState(null);
  const [preview, setPreview] = useState();

  const id = useSelector((state) => state.uid.uid);

  const uploadImageHandler = async () => {
    if (upload == null) {
      alert('Either add a new image or click "X" to close');
    } else {
      try {
        //changing image name by creating new file object
        var blob = upload.slice(0, upload.size, "image/png");

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
      <div className={classes["edit-pic__parent"]}>
        <br />
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e) => {
            setUpload(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />
        <br />
        Note: 1x1 proportioned images work best
        <br />
        <br />
        <img
          className={classes["image-preview"]}
          alt="Photo Preview"
          src={preview}
        />
        <br />
        <button
          className={classes["save-img-button"]}
          onClick={uploadImageHandler}
        >
          Save
        </button>
      </div>
    </CoverPage>
  );
};

export default EditProfilePic;

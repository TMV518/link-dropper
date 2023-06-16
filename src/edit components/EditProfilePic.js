import CoverPage from "../reusable components/CoverPage";
import { useSelector } from "react-redux";
import { useState } from "react";
import classes from "./EditProfilePic.module.css";
const EditProfilePic = () => {
  //   const borderRadius = useSelector((state) => state.borderStyle.borderStyle);

  const [preview, setPreview] = useState();

  return (
    <CoverPage>
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

import UserProfile from "../UserProfile";
import CustomColorPicker from "../reusable components/CustomColorPicker";
import { db } from "../firebase/firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { buttonColorActions } from "../store";

const EditBgColor = () => {
  const id = useSelector((state) => state.uid.uid);
  const dispatch = useDispatch();

  //getting reference to database
  const userProfileRef = doc(db, "users", id);

  const colorChangeHandler = async (color) => {
    try {
      await updateDoc(userProfileRef, { bgColor: color });
      console.log(color);
    } catch (error) {
      console.log(error.message);
    }

    dispatch(bgColorActions.setBgColor(color));
  };

  return (
    <>
      <CustomColorPicker setColor={colorChangeHandler} />
      <UserProfile />
    </>
  );
};

export default EditBgColor;

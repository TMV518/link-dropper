import ListBox from "../reusable components/ListBox";
import ListBoxButton from "../reusable components/ListBoxButton";
import { useDispatch } from "react-redux";
import { fontFamilyActions } from "../store/index";
import UserProfile from "../UserProfile";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const EditFontFamily = () => {
  const dispatch = useDispatch();

  const fontFamily = useSelector((state) => state.fontFamily.fontFamily);
  const id = useSelector((state) => state.uid.uid);

  //getting reference to database
  const userProfileRef = doc(db, "users", id);

  const fontChangeHandler = async (event) => {
    try {
      await updateDoc(userProfileRef, { fontFamily: event.target.value });
    } catch (error) {
      console.log(error.message);
    }
    dispatch(fontFamilyActions.setFontFamily(event.target.value));
  };

  return (
    <>
      <ListBox>
        <ListBoxButton
          fontFamily="Times New Roman"
          value="Times New Roman"
          onClick={(e) => {
            fontChangeHandler(e);
          }}
        >
          Times New Roman
        </ListBoxButton>
        <ListBoxButton
          fontFamily="Comic Sans MS"
          value="Comic Sans MS"
          onClick={(e) => {
            fontChangeHandler(e);
          }}
        >
          Comic Sans MS
        </ListBoxButton>
        <ListBoxButton
          fontFamily="Brush Script MT"
          value="Brush Script MT"
          onClick={(e) => {
            fontChangeHandler(e);
          }}
        >
          Brush Script MT
        </ListBoxButton>
        <ListBoxButton
          fontFamily="Impact"
          value="Impact"
          onClick={(e) => {
            fontChangeHandler(e);
          }}
        >
          Impact
        </ListBoxButton>
        <ListBoxButton
          fontFamily="lato-normal"
          value="lato-normal"
          onClick={(e) => {
            fontChangeHandler(e);
          }}
        >
          Lato
        </ListBoxButton>
        <ListBoxButton
          fontFamily="noto-sans"
          value="noto-sans"
          onClick={(e) => {
            fontChangeHandler(e);
          }}
        >
          Noto Sans
        </ListBoxButton>
      </ListBox>
      <UserProfile />
    </>
  );
};

export default EditFontFamily;

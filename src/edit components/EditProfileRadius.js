import { useDispatch, useSelector } from "react-redux";
import { profileRadiusActions } from "../store/index";
import ListBox from "../reusable components/ListBox";
import ListBoxButton from "../reusable components/ListBoxButton";
import UserProfile from "../UserProfile";
import { db } from "../firebase/firebase-config.js";
import { updateDoc, doc } from "firebase/firestore";

const EditProfileRadius = () => {
  const dispatch = useDispatch();
  const profileRadius = useSelector(
    (state) => state.profileRadius.profileRadius
  );
  const id = useSelector((state) => state.uid.uid);

  //getting reference to database
  const userProfileRef = doc(db, "users", id);

  const onProfileRadiusChangeHandler = async (event) => {
    try {
      await updateDoc(userProfileRef, { profileRadius: event.target.value });
    } catch (error) {
      console.log(error.message);
    }
    dispatch(profileRadiusActions.setProfileRadius(event.target.value));
  };
  return (
    <>
      <ListBox>
        <ListBoxButton
          value={"0"}
          onClick={(e) => {
            onProfileRadiusChangeHandler(e);
          }}
        >
          Square
        </ListBoxButton>
        <ListBoxButton
          value={"15%"}
          onClick={(e) => {
            onProfileRadiusChangeHandler(e);
          }}
        >
          Rounded Square
        </ListBoxButton>
        <ListBoxButton
          value={"50%"}
          onClick={(e) => {
            onProfileRadiusChangeHandler(e);
          }}
        >
          Circle
        </ListBoxButton>
      </ListBox>
      <UserProfile />
    </>
  );
};

export default EditProfileRadius;

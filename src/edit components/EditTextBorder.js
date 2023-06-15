import { useDispatch, useSelector } from "react-redux";
import ListBox from "../reusable components/ListBox";
import ListBoxButton from "../reusable components/ListBoxButton";
import { borderStyleActions } from "../store/index";
import UserProfile from "../UserProfile";
import { db } from "../firebase/firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const EditTextBorder = () => {
  const dispatch = useDispatch();

  const textBorder = useSelector((state) => state.borderStyle.borderStyle);
  const id = useSelector((state) => state.uid.uid);

  //getting reference to database
  const userProfileRef = doc(db, "users", id);

  const changeBorderHandler = async (event) => {
    try {
      await updateDoc(userProfileRef, { borderStyle: event.target.value });
    } catch (error) {
      console.log(error.message);
    }
    dispatch(borderStyleActions.setBorder(event.target.value));
  };

  return (
    <>
      <ListBox>
        <ListBoxButton value="none" onClick={(e) => changeBorderHandler(e)}>
          None
        </ListBoxButton>
        <ListBoxButton value="solid" onClick={(e) => changeBorderHandler(e)}>
          Solid
        </ListBoxButton>
        <ListBoxButton value="dashed" onClick={(e) => changeBorderHandler(e)}>
          Dashed
        </ListBoxButton>
        <ListBoxButton value="dotted" onClick={(e) => changeBorderHandler(e)}>
          Dotted
        </ListBoxButton>
      </ListBox>
      <UserProfile />
    </>
  );
};

export default EditTextBorder;

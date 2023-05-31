import { useDispatch, useSelector } from "react-redux";
import { profileRadiusActions } from "./store/index";
import ListBox from "./reusable components/ListBox";
import ListBoxButton from "./reusable components/ListBoxButton";

const EditProfileRadius = () => {
  const dispatch = useDispatch();
  const profileRadius = useSelector(
    (state) => state.profileRadius.profileRadius
  );

  const onProfileRadiusChangeHandler = (event) => {
    dispatch(profileRadiusActions.setProfileRadius(event.target.value));
  };
  return (
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
  );
};

export default EditProfileRadius;

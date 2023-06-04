import ListBox from "../reusable components/ListBox";
import ListBoxButton from "../reusable components/ListBoxButton";
import { useDispatch } from "react-redux";
import { fontFamilyActions } from "../store/index";

const EditFontFamily = () => {
  const dispatch = useDispatch();

  const fontChangeHandler = (event) => {
    dispatch(fontFamilyActions.setFontFamily(event.target.value));
  };

  return (
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
    </ListBox>
  );
};

export default EditFontFamily;

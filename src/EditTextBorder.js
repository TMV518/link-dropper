import { useDispatch } from "react-redux";
import ListBox from "./reusable components/ListBox";
import ListBoxButton from "./reusable components/ListBoxButton";
import { borderStyleActions } from "./store/index";

const EditTextBorder = () => {
  const dispatch = useDispatch();

  const changeBorderHandler = (event) => {
    dispatch(borderStyleActions.setBorder(event.target.value));
  };

  return (
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
  );
};

export default EditTextBorder;

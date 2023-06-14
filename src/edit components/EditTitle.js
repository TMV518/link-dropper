import { useDispatch, useSelector } from "react-redux";
import CoverPage from "../reusable components/CoverPage";
import { titleActions } from "../store/index";
import { useState } from "react";
import UserProfile from "../UserProfile";
const EditTitle = () => {
  //using selector to fill in stored title as default value
  const title = useSelector((state) => state.title.title);

  //temp title used for onChange
  const [tempTitle, setTempTitle] = useState("");

  const dispatch = useDispatch();

  //changes the stored title
  const titleChangeHandler = (event) => {
    event.preventDefault();
    console.log(tempTitle);
    dispatch(titleActions.setTitle(tempTitle));
  };

  return (
    <>
      <CoverPage>
        <form onSubmit={titleChangeHandler}>
          <input
            type="text"
            placeholder="Enter a title"
            defaultValue={title}
            onChange={(e) => {
              setTempTitle(e.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </CoverPage>
      <UserProfile />
    </>
  );
};

export default EditTitle;

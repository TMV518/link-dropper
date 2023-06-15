import EditSideButtons from "./EditSideButtons";
import Profile from "../Profile";
import UserProfile from "../UserProfile";
import { getDocs } from "firebase/firestore";
import UserProfileEdit from "../UserProfileEdit";

const EditPage = () => {
  return (
    <>
      <EditSideButtons />
      <UserProfile />
    </>
  );
};

export default EditPage;

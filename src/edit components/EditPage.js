import EditSideButtons from "./EditSideButtons";
import Profile from "../Profile";
import UserProfile from "../UserProfile";
import { getDocs } from "firebase/firestore";

const EditPage = () => {
  return (
    <>
      <EditSideButtons />
      <UserProfile />
    </>
  );
};

export default EditPage;

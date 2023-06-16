import EditSideButtons from "./EditSideButtons";
import Profile from "../Profile";
import UserProfile from "../UserProfile";
import { getDocs } from "firebase/firestore";
import classes from "./EditPage.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const EditPage = () => {
  const id = useSelector((state) => state.uid.uid);
  return (
    <>
      <EditSideButtons />
      <UserProfile />
    </>
  );
};

export default EditPage;

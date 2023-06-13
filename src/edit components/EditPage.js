import EditSideButtons from "./EditSideButtons";
import Profile from "../Profile";
import UserProfile from "../UserProfile";
import { getDocs } from "firebase/firestore";

const EditPage = () => {
  //getting profile props and passing them to the UserProfile
  // const getProfileProps = async () => {
  //   try {
  //     const data = await getDocs(profileRef);
  //     //console.log(data.docs);
  //     setProfile(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  return (
    <>
      <EditSideButtons />
      <UserProfile />
    </>
  );
};

export default EditPage;

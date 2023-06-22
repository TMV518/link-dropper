import SideButtonHolder from "../reusable components/SideButtonHolder";
import SideButton from "../reusable components/SideButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const EditSideButtons = () => {
  //getting id for url
  const id = useSelector((state) => state.uid.uid);
  console.log(id);
  return (
    <SideButtonHolder>
      <Link to="title">
        <SideButton>Title</SideButton>
      </Link>
      <Link to="links">
        <SideButton>Links</SideButton>
      </Link>
      <Link to="bg-color">
        <SideButton>Bg Color</SideButton>
      </Link>
      <Link to="font">
        <SideButton>Font</SideButton>
      </Link>
      <Link to="text-color">
        <SideButton>Text Color</SideButton>
      </Link>
      <Link to="text-border">
        <SideButton>Link Border</SideButton>
      </Link>
      <Link to="profile-pic">
        <SideButton>Profile pic</SideButton>
      </Link>
      <Link to="profile-shape">
        <SideButton>Profile Shape</SideButton>
      </Link>
    </SideButtonHolder>
  );
};

export default EditSideButtons;

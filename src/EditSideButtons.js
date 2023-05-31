import SideButtonHolder from "./reusable components/SideButtonHolder";
import SideButton from "./reusable components/SideButton";

const EditSideButtons = () => {
  return (
    <SideButtonHolder>
      <SideButton>Title</SideButton>
      <SideButton>Links</SideButton>
      <SideButton>bgColor</SideButton>
      <SideButton>Font</SideButton>
      <SideButton>Text Color</SideButton>
      <SideButton>Profile pic</SideButton>
      <SideButton>Profile Shape</SideButton>
      <SideButton>Link Border</SideButton>
    </SideButtonHolder>
  );
};

export default EditSideButtons;

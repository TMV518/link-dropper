import classes from "./SideButton.module.css";
import image from "../assets/edit icons/noun-internet-5772287.svg";

const SideButton = (props) => {
  return (
    <button className={classes["side-button"]}>
      {/* <img src={image} alt="hello" /> */}
      {props.children}
    </button>
  );
};

export default SideButton;

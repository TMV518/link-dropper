import classes from "./SideButton.module.css";

const SideButton = (props) => {
  return (
    <button className={classes["side-button"]}>
      {/* <img src={image} alt="hello" /> */}
      {props.children}
    </button>
  );
};

export default SideButton;

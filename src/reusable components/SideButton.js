import classes from "./SideButton.module.css";

const SideButton = (props) => {
  return <button className={classes["side-button"]}>{props.children}</button>;
};

export default SideButton;

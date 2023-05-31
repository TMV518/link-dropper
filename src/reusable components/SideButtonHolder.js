import classes from "./SideButtonHolder.module.css";

const SideButtonHolder = (props) => {
  return <div className={classes["side-button__holder"]}>{props.children}</div>;
};

export default SideButtonHolder;

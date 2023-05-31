import classes from "./ListBoxButton.module.css";

const ListBoxButton = (props) => {
  return (
    // <input
    //   className={classes["list-box__child"]}
    //   style={{ fontFamily: props.fontFamily }}
    //   type={props.inputType}
    //   value={props.value}
    // />
    <button
      className={classes["list-box__button"]}
      style={{ fontFamily: props.fontFamily }}
      value={props.value}
      onClick={props.onClick}
      //   onClick={(e) => {
      //     changeFontHandler(e);
      //   }}
    >
      {props.children}
    </button>
  );
};

export default ListBoxButton;

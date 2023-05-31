import classes from "./ListBox.module.css";

const ListBox = (props) => {
  return (
    <div className={classes["list-box__parent"]}>
      <button
        className={classes["list-box__x-button"]}
        // onClick={() => {
        //   setFontPopUp((prev) => !prev);
        // }}
      >
        X Close
      </button>
      <div className={classes["list-box"]}>
        {props.children}
        {/* <button
          //   onClick={(e) => {
          //     changeFontHandler(e);
          //   }}
          value="Times New Roman"
          style={{ fontFamily: "Times New Roman" }}
        >
          Times New Roman
        </button>
        <button value="Comic Sans MS" style={{ fontFamily: "Comic Sans MS" }}>
          Comic Sans
        </button>
        <button value="Arial" style={{ fontFamily: "Arial" }}>
          Arial
        </button>
        <button value="Impact" style={{ fontFamily: "Impact" }}>
          Impact
        </button>
        <button value="Georgia" style={{ fontFamily: "Georgia" }}>
          Georgia
        </button>
        <button
          value="Brush Script MT"
          style={{ fontFamily: "Brush Script MT" }}
        >
          Brush Script MT
        </button> */}
      </div>
    </div>
  );
};

export default ListBox;

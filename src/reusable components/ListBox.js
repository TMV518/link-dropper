import classes from "./ListBox.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ListBox = (props) => {
  const id = useSelector((state) => state.uid.uid);
  return (
    <div className={classes["list-box__parent"]}>
      <Link to={`../../user/${id}/edit`}>
        <button
          className={classes["list-box__x-button"]}
          // onClick={() => {
          //   setFontPopUp((prev) => !prev);
          // }}
        >
          X Close
        </button>
      </Link>
      <div className={classes["list-box"]}>{props.children}</div>
    </div>
  );
};

export default ListBox;

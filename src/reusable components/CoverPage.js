import classes from "./CoverPage.module.css";
import { Link } from "react-router-dom";

const CoverPage = (props) => {
  const closeCoverPage = () => {};

  return (
    <div className={classes["cover-page"]}>
      <Link to="/edit">
        <button>X</button>
      </Link>
      {props.children}
    </div>
  );
};

export default CoverPage;

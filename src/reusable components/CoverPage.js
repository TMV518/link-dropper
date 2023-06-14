import classes from "./CoverPage.module.css";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CoverPage = (props) => {
  const id = useSelector((state) => state.uid.uid);

  return (
    <div className={classes["cover-page"]}>
      <Link to={`../../user/${id}/edit`}>
        <button>X</button>
      </Link>
      {props.children}
    </div>
  );
};

export default CoverPage;

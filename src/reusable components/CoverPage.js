import classes from "./CoverPage.module.css";

const CoverPage = (props) => {
  return (
    <div className={classes["cover-page"]}>
      <button>X</button>
      {props.children}
    </div>
  );
};

export default CoverPage;

import classes from "./EditLinks.module.css";
import CoverPage from "../reusable components/CoverPage";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { linkActions } from "../store/index";
import uuid from "react-uuid";

const EditLinks = () => {
  //used for clearing form values
  const nameRef = useRef();
  const linkRef = useRef();

  const [formIsValid, setFormIsValid] = useState(true);

  const linkList = useSelector((state) => state.linkList.linkList);

  const [tempName, setTempName] = useState("");
  const [tempLink, setTempLink] = useState("");
  const [editList, setEditList] = useState([]);

  useEffect(() => {
    console.log("USE EFFECT");
    setEditList(linkList);
  }, []);

  const dispatch = useDispatch();

  //adds link object to temporary editList array
  const linkAddHandler = () => {
    if (tempName.trim() !== "" && tempLink.trim() !== "") {
      setFormIsValid(true);

      let tempList = [...editList];

      tempList.unshift({ name: tempName, link: tempLink, key: uuid() });
      setEditList(tempList);

      setTempName("");
      setTempLink("");

      nameRef.current.value = "";
      linkRef.current.value = "";
    } else {
      setFormIsValid(false);
    }
  };

  //removes link object from the temporary editList array
  const linkRemoveHandler = (linkKey) => {
    console.log("Remove");
    let tempList = [...editList];

    console.log(linkKey);

    setEditList(tempList.filter((link) => link.key !== linkKey));

    console.log(editList);
  };

  //moves link up in list
  const linkUpHandler = (linkKey) => {
    let tempList = [...editList];

    let currentLink = tempList.filter((link) => link.key === linkKey)[0];
    let currentLinkIndex = tempList.findIndex((link) => link.key === linkKey);
    console.log(currentLink);

    let linkToSwapIndex = currentLinkIndex - 1;
    let linkToSwap = tempList[linkToSwapIndex];

    console.log(linkToSwap);

    tempList[linkToSwapIndex] = currentLink;
    tempList[currentLinkIndex] = linkToSwap;

    setEditList(tempList);

    console.log(linkKey + " moved up");
  };

  //moves link down in list
  const linkDownHandler = (linkKey) => {
    let tempList = [...editList];

    let currentLink = tempList.filter((link) => link.key === linkKey)[0];
    let currentLinkIndex = tempList.findIndex((link) => link.key === linkKey);
    console.log(currentLink);

    let linkToSwapIndex = currentLinkIndex + 1;
    let linkToSwap = tempList[linkToSwapIndex];

    console.log(linkToSwap);

    tempList[linkToSwapIndex] = currentLink;
    tempList[currentLinkIndex] = linkToSwap;

    setEditList(tempList);

    console.log(linkKey + " moved down");
  };

  //saves the temporary editList to the store list
  const saveList = () => {
    dispatch(linkActions.saveList(editList));
    console.log(linkList);
  };

  return (
    <CoverPage>
      <button onClick={saveList}>Save</button>
      <h3>Edit the links on your page</h3>
      <h4>Add a link</h4>
      <div className={classes["edit-links__parent"]}>
        <button className={classes["add-button"]} onClick={linkAddHandler}>
          +
        </button>
        <div className={classes["edit-links"]}>
          <input
            ref={nameRef}
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setTempName(e.target.value);
            }}
          />
          <input
            ref={linkRef}
            type="text"
            placeholder="Link"
            onChange={(e) => {
              setTempLink(e.target.value);
            }}
          />
        </div>
      </div>
      {!formIsValid && (
        <p style={{ color: "red" }}>Name and link are required fields</p>
      )}
      <h4>Remove links or change their order</h4>
      <div className={classes["link-list"]}>
        <ul>
          {editList.map((linkObj, index) => {
            return (
              <li key={linkObj.key}>
                <button
                  value={linkObj.key}
                  onClick={(e) => {
                    linkRemoveHandler(e.target.value);
                  }}
                >
                  X
                </button>
                <a href={linkObj.link}>{linkObj.name}</a>
                {index !== 0 && (
                  <button
                    value={linkObj.key}
                    onClick={(e) => {
                      linkUpHandler(e.target.value);
                    }}
                  >
                    up
                  </button>
                )}
                {index !== editList.length - 1 && (
                  <button
                    value={linkObj.key}
                    onClick={(e) => {
                      linkDownHandler(e.target.value);
                    }}
                  >
                    down
                  </button>
                )}
              </li>
            );
          })}
          {editList.length === 0 && <p>No links yet!</p>}
        </ul>
      </div>
    </CoverPage>
  );
};

export default EditLinks;

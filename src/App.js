import classes from "./App.module.css";
import { useEffect, useRef, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

import EditPage from "./EditPage";
import { useSelector } from "react-redux";

import EditLinks from "./EditLinks";
import EditTitle from "./EditTitle";
import EditTextBorder from "./EditTextBorder";
import EditProfileRadius from "./EditProfileRadius";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import EditFontFamily from "./EditFontFamily";

function App() {
  //custom hook from react-color-palette
  //Made by Wondermarin on Github
  //https://github.com/Wondermarin/react-color-palette
  const [color, setColor] = useColor("hex", "#e26161");

  // const [windowSize, setWindowSize] = useState([
  //   window.innerWidth,
  //   window.innerHeight,
  // ]);

  // useEffect(() => {
  //   setWindowSize([window.innerWidth, window.innerHeight]);
  // }, [window.innerWidth, window.innerHeight]);

  const title = useSelector((state) => state.title.title);
  const fontFamily = useSelector((state) => state.fontFamily.fontFamily);
  const borderStyle = useSelector((state) => state.borderStyle.borderStyle);
  const profileRadius = useSelector(
    (state) => state.profileRadius.profileRadius
  );
  const linkList = useSelector((state) => state.linkList.linkList);

  return (
    <div className={classes["app-wrapper"]}>
      <Router>
        <Link to="edit">
          <button>Edit</button>
        </Link>

        <Routes>
          <Route exact path="edit" element={<EditPage />} />
          <Route path="edit/title" element={<EditTitle />} />
          <Route path="edit/links" element={<EditLinks />} />
          <Route path="edit/font" element={<EditFontFamily />} />
          <Route path="edit/profile-shape" element={<EditProfileRadius />} />
          <Route path="edit/text-border" element={<EditTextBorder />} />
        </Routes>
      </Router>

      <div
        className={classes["profile-wrapper"]}
        style={{ backgroundColor: color.hex, fontFamily: fontFamily }}
      >
        <img
          className={classes["profile-photo"]}
          alt="profile_photo"
          src={require("./assets/penguin_placeholder.png")}
          style={{ borderRadius: profileRadius }}
        />
        <h1>{title}</h1>
        <ul>
          {linkList.map((linkObj) => {
            return (
              <li key={linkObj.key} style={{ borderStyle: borderStyle }}>
                <a href={linkObj.link}>{linkObj.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;

import classes from "./App.module.css";
import { useEffect, useRef, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import SideButton from "./reusable components/SideButton";
import SideButtonHolder from "./reusable components/SideButtonHolder";
import EditPage from "./EditPage";
import { useSelector } from "react-redux";
import EditSideButtons from "./EditSideButtons";

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

  const [fontPopUp, setFontPopUp] = useState(true);

  const fontFamily = useSelector((state) => state.fontFamily.fontFamily);
  const borderStyle = useSelector((state) => state.borderStyle.borderStyle);
  const profileRadius = useSelector(
    (state) => state.profileRadius.profileRadius
  );

  return (
    <div className={classes["app-wrapper"]}>
      {/*<ColorPicker
        width={456}
        height={228}
        color={color}
        onChange={setColor}
        onChangeComplete={() => {
          console.log(color.hex);
        }}
        hideHSV
        dark
      />*/}
      {/* {fontPopUp && (
        <ListBox>
          <ListBoxButton fontFamily="Times New Roman" value="Times New Roman">
            Times New Roman
          </ListBoxButton>
          <ListBoxButton fontFamily="Comic Sans MS" value="Comic Sans MS">
            Comic Sans MS
          </ListBoxButton>
        </ListBox>
        // <ListBox>
        //   <ColorPicker
        //     width={window.innerWidth}
        //     height={100}
        //     color={color}
        //     onChange={setColor}
        //     onChangeComplete={() => {
        //       console.log(color.hex);
        //     }}
        //     hideHSV
        //     dark
        //   />
        // </ListBox>
      )} */}
      <EditPage />

      {/* <EditSideButtons /> */}
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
        <h1>Penguin :)</h1>
        <h2>Links</h2>
        <ul>
          <li style={{ borderStyle: borderStyle }}>Instagram</li>
          <li style={{ borderStyle: borderStyle }}>Twitter</li>
          <li style={{ borderStyle: borderStyle }}>LinkedIn</li>
        </ul>
      </div>
    </div>
  );
}

export default App;

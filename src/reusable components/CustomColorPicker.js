import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from "react";
import ListBox from "./ListBox";
import classes from "./CustomColorPicker.module.css";

const CustomColorPicker = (props) => {
  //custom hook from react-colorful
  //Made by Vlad Shilov (omgovich)
  //https://www.npmjs.com/package/react-colorful
  const [color, setColor] = useState("");

  return (
    <ListBox>
      <button
        className={classes["set-color-button"]}
        onClick={() => {
          props.setColor(color);
        }}
      >
        Set Color
      </button>

      <HexColorPicker color={color} onChange={setColor} />
    </ListBox>
  );
};

export default CustomColorPicker;

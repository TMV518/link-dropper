import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from "react";
import ListBox from "./ListBox";
import classes from "./CustomColorPicker.module.css";

const CustomColorPicker = () => {
  //custom hook from react-color-palette
  //Made by Wondermarin on Github
  //https://github.com/Wondermarin/react-color-palette
  const [color, setColor] = useState("#e26161");

  useEffect(() => {
    console.log(color);
  }, [color]);

  return (
    <ListBox>
      <button>Set Color</button>
      <HexColorPicker
        className={classes["the-color-picker"]}
        color={color}
        onChange={setColor}
      />
    </ListBox>
  );
};

export default CustomColorPicker;

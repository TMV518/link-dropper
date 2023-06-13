import { createSlice, configureStore } from "@reduxjs/toolkit";
import uuid from "react-uuid";


//initial state
const initialState = {
  title: "My Links",
  linkList: [
    {name:"Instagram", link:"https://www.instagram.com",key:uuid()}
  ],
  bgColor: "",
  fontFamiy: "",
  textColor: "",
  profilePic: "",
  profileRadius: 0,
  borderStyle: "none",
};

//SLICES

//title edit
const titleSlice = createSlice({
  name: "title",
  initialState: initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
  },
});

//links
const linkSlice = createSlice({
  name: "linkList",
  initialState: initialState,
  reducers: {
    addLink(state, action) {
      state.linkList.unshift(action.payload);
    },
    removeLink() {},
    moveUp() {},
    moveDown() {},
    saveList(state, action) {
      state.linkList = action.payload;
    },
  },
});

//background color
const bgColorSlice = createSlice({
  name: "bgColor",
  initialState: initialState,
  reducers: {
    setColor(state, action) {
      state.bgColor = action.payload;
    },
  },
});

//font family
const fontFamilySlice = createSlice({
  name: "fontFamily",
  initialState: initialState,
  reducers: {
    setFontFamily(state, action) {
      state.fontFamily = action.payload;
    },
  },
});

//link border
const borderSlice = createSlice({
  name: "borderStyle",
  initialState: initialState,
  reducers: {
    setBorder(state, action) {
      state.borderStyle = action.payload;
    },
  },
});

//profile border radius
const profileRadiusSlice = createSlice({
  name: "profileRadius",
  initialState: initialState,
  reducers: {
    setProfileRadius(state, action) {
      state.profileRadius = action.payload;
    },
  },
});

//setting up store
export const store = configureStore({
  reducer: {
    bgColor: bgColorSlice.reducer,
    fontFamily: fontFamilySlice.reducer,
    borderStyle: borderSlice.reducer,
    profileRadius: profileRadiusSlice.reducer,
    title: titleSlice.reducer,
    linkList: linkSlice.reducer,
  },
});

export const bgColorActions = bgColorSlice.actions;
export const fontFamilyActions = fontFamilySlice.actions;
export const borderStyleActions = borderSlice.actions;
export const profileRadiusActions = profileRadiusSlice.actions;
export const titleActions = titleSlice.actions;
export const linkActions = linkSlice.actions;

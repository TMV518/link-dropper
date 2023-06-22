// import { useState, useEffect } from "react";
// import { db } from "./firebase/firebase-config.js";
// import { collection, getDocs } from "firebase/firestore";
// import classes from "./Profile.module.css";

// const Profile = () => {
//     const profileRef = collection(db, "test");

//     const [profile, setProfile] = useState();
//     //profile state variables
//     const [bgColor, setBgColor] = useState("white");
//     const [title, setTitle] = useState("");
//     const [linkList, setLinkList] = useState([]);
//     const [textColor, setTextColor] = useState("");
//     const [borderStyle, setBorderStyle] = useState("none");
//     const [fontFamily, setFontFamily] = useState("Times New Roman");
//     const [profilePic, setProfilePic] = useState("");
//     const [profileRadius, setProfileRadius] = useState("0%");

//     const getProfileProps = async () => {
//         try {
//           const data = await getDocs(profileRef);
//           //console.log(data.docs);
//           setProfile(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//         } catch (error) {
//           console.log(error.message);
//         }
//     };

//     useEffect(() => {
//         getProfileProps();
//         try {
//           console.log(profile[0]);
//           setBgColor(profile[0].bgColor);
//             setTitle(profile[0].title);
//             setLinkList(profile[0].linkList);
//             setTextColor(profile[0].textColor);
//             setBorderStyle(profile[0].borderStyle);
//             setFontFamily(profile[0].fontFamily);
//             setProfilePic(profile[0].profilePic);
//             setProfileRadius(profile[0].profileRadius);

//         } catch (error) {
//           console.log(error.message);
//         }
//       }, [profile]);

//     return <div
//         className={classes["profile-wrapper"]}
//         style={{ backgroundColor: bgColor, fontFamily: fontFamily }}
//       >
//         <img
//           className={classes["profile-photo"]}
//           alt="profile_photo"
//           src={require("./assets/penguin_placeholder.png")}
//           style={{ borderRadius: profileRadius }}
//         />
//         <h1>{title}</h1>
//         <ul>
//           {linkList.map((linkObj) => {
//             return (
//               <li key={linkObj.key} style={{ borderStyle: borderStyle }}>
//                 <a href={linkObj.link}>{linkObj.name}</a>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
// }

// export default Profile;

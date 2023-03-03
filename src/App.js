import classes from "./App.module.css";

function App() {
  return (
    <div className={classes["app-wrapper"]}>
      <div className={classes["profile-wrapper"]}>
        <img
          className={classes["profile-photo"]}
          alt="profile_photo"
          src={require("./assets/penguin_placeholder.png")}
        />
        <h1>Penguin :)</h1>
        <h2>Links</h2>
        <ul>
          <li>Instagram</li>
          <li>Twitter</li>
          <li>LinkedIn</li>
        </ul>
      </div>
    </div>
  );
}

export default App;

import Profile from "../Profile/Profile.jsx";
import Library from "../Library/Library.jsx";
import styles from "./HomeScreen.module.css";

const HomeScreen = () => {

    // const 
  return (
    <div className={styles.homeScreen}>
      <Library />
      <Profile />
    </div>
  );
};

export default HomeScreen;

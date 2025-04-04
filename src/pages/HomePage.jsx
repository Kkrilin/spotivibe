import Library from "../components/Library/Library";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import SideBar from "../components/SideBar/SideBar.jsx";

const HomePage = () => {
  return (
    <div className="main_container">
      <Header />
      <div style={{ display: "flex" }}>
        <Library />
        <Outlet />
        <SideBar />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

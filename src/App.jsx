import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import "./App.css";
import HomeScreen from "./components/HomeScreen/HomeScreen.jsx";
import Header from "./components/Header/Header.jsx";
import Authorised from "./components/Authorised/Authorised.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/authorised" element={<Authorised />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

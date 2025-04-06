import { useSelector } from "react-redux";
const Footer = () => {
  const { songDetail } = useSelector((state) => state.songDetail);
  return (
    <div
      style={{ height: "13vh", backgroundColor: "black", marginTop: "4px" }}
    ></div>
  );
};

export default Footer;

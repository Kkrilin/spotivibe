import ReactPullToRefresh from "react-pull-to-refresh";
import { useDispatch } from "react-redux";
import { triggerRefresh } from "../../redux/refreshSlice";

function PullToRefresh({ children, setCount, type }) {
  const dispatch = useDispatch();
  const handleRefresh = () => {
    return new Promise((resolve) => {
      if (type === "global") {
        dispatch(triggerRefresh());
      } else {
        setCount((state) => state + 1);
      }
      resolve();
    });
  };
  return (
    <ReactPullToRefresh
      onRefresh={handleRefresh}
      pullingContent={
        <div style={{ textAlign: "center", color: "#fff" }}>
          ⬇️ Pull down to refresh
        </div>
      }
      releasingContent={
        <div style={{ textAlign: "center", color: "#fff" }}>
          ⬆️ Release to refresh
        </div>
      }
    >
      {children}
    </ReactPullToRefresh>
  );
}

export default PullToRefresh;

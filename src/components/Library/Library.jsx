import Artists from "./Artists.jsx";
import PlayLists from "./PlayLists.jsx";
import Filter from "./Filter.jsx";

const Library = ({ token }) => {
  return (
    <div className="library">
      <Filter />
      <div>
        <Artists token={token} />
        <PlayLists />
      </div>
    </div>
  );
};

export default Library;

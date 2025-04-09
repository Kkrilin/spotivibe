import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPlaylist } from "../../redux/profileSlice";
import { useDispatch } from "react-redux";

const CreatePlayList = ({ handleClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { data } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = data.id;
  const handleInputChange = (e) => {
    if (e.target.id === "name") {
      setName(e.target.value);
    }

    if (e.target.id === "description") {
      setDescription(e.target.value);
    }
  };

  const token = localStorage.getItem("access_token");
  const createPlaylist = async () => {
    const createUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const body = {
      name,
      description,
      public: true,
    };
    try {
      const createResponse = await axios.post(createUrl, body, header);
      const playlistId = createResponse.data.id;
      if (playlistId) {
        navigate(`/playlist/${playlistId}`);
        dispatch(addPlaylist({ data: createResponse.data }));
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlaylist();
    handleClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="createPlaylist_form creatPlaylist_container"
    >
      <div className="playlist_name">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Enter playlist name"
          onChange={handleInputChange}
        />
      </div>
      <div className="playlist_description">
        <label htmlFor="description">description</label>
        <input
          type="text"
          id="description"
          value={description}
          placeholder="add an optional description"
          onChange={handleInputChange}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <button className="playlistSave_button" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default CreatePlayList;

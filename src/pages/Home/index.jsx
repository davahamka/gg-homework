/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Table from "../../components/Table";
import { API_SPOTIFY } from "../../utils/constants";

const Home = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [, setDataPlaylist] = useState([]);
  const [playlist, setPlaylist] = useState("");
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const accessToken = useSelector((state) => state.auth.accessToken);

  const getProfileUser = async () => {
    const response = await axios.get(
      API_SPOTIFY + `me?access_token=${accessToken}`
    );
    return response.data;
  };

  const getUserPlaylist = async () => {
    const response = await axios.get(
      API_SPOTIFY + `me/playlists?access_token=${accessToken}`
    );
    return response.data;
  };

  const addTracksToPlaylist = async () => {
    let allTracks = "";
    selectedData.forEach((it) => {
      allTracks += it + ",";
    });
    const response = await axios.post(
      API_SPOTIFY +
        `playlists/${playlist.id}/tracks?access_token=${accessToken}&uris=${allTracks}`
    );
    toast.success("Tracks added");
    setSelectedData([]);
    setSearch("");
    setData([]);
    return response.data;
  };

  const createPlaylist = async (data) => {
    setLoading(true);
    const response = await axios.post(
      API_SPOTIFY + `users/${userId}/playlists?access_token=${accessToken}`,
      {
        ...data,
        public: false,
      }
    );
    setLoading(false);
    setPlaylist(response.data);
    setForm({});
    toast.success("Playlist successfully added");
    return response.data;
  };

  useEffect(async () => {
    const profileUser = await getProfileUser();
    setUserId(profileUser.id);
  }, []);

  useEffect(async () => {
    if (accessToken) {
      const playlistResponse = await getUserPlaylist();
      setDataPlaylist(playlistResponse.items);
    }
  }, [accessToken]);

  const handleInputForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlaylist(form);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    fetch(
      "https://api.spotify.com/v1/search?q=" +
        search +
        "&access_token=" +
        accessToken +
        "&type=track"
    )
      .then((data) => data.json())
      .then((data) => {
        setData(data.tracks.items);
      });
  };

  const handleAdd = () => {
    addTracksToPlaylist();
  };

  const handleSelect = (data) => {
    if (selectedData.includes(data)) {
      const findIndex = selectedData.findIndex((v) => v === data);
      setSelectedData((prevData) => {
        const newArr = [
          ...prevData.slice(0, findIndex),
          ...prevData.slice(findIndex + 1, prevData.length),
        ];
        return newArr;
      });
    } else {
      setSelectedData((prevData) => [...prevData, data]);
    }
  };

  return (
    <div className="layout" style={{ paddingTop: 20 }}>
      <div>
        <Toaster />
        <h2 className="text-3xl font-bold text-white pt-8">Add Playlist</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                onChange={handleInputForm}
                placeholder="Insert your name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                onChange={handleInputForm}
                rows="3"
                placeholder="Insert your description"
              />
            </div>

            <button className="bg-[#1db954] mt-6 text-gray-800 px-6 py-2 rounded-full font-bold">
              {loading ? "Loading" : "Add Playlist"}
            </button>
          </div>
        </form>

        <hr className="mt-6 " />
      </div>

      {playlist ? (
        <>
          <div className="search-box mt-6 text-white">
            <input
              onChange={handleChange}
              placeholder="Find tracks that you want"
              className="text-slate-600"
            />
            <div className="btn-wrapper">
              <button
                className="bg-white text-black w-full py-2 rounded-full"
                onClick={handleSearch}
              >
                Cari
              </button>
            </div>
          </div>

          <button
            className="w-full bg-[#1db954] mt-2 rounded-full py-2"
            onClick={handleAdd}
          >
            Add to {playlist.name} Playlist
          </button>

          <div style={{ width: "100%" }} className="text-white mt-4">
            <Table
              selectedData={selectedData}
              data={data}
              handleSelect={handleSelect}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
export default Home;

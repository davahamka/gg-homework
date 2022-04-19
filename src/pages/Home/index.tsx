/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import AlbumList from "../../components/AlbumList";
import SearchTrack from "../../components/SearchTrack";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Item, MyPlaylistResponse } from "../../models/MyPlaylist";
import { ProfileResponse } from "../../models/Profile";
import { ItemTrack, SearchTracksResponse } from "../../models/SearchTracks";
import { API_SPOTIFY } from "../../utils/constants";

type FormValue = {
  name: string;
  description: string;
};

const Home = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<ItemTrack[]>([]);
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [, setDataPlaylist] = useState<Item[]>([]);
  const [playlist, setPlaylist] = useState({
    id: "",
    name: "",
  });
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const getProfileUser = async () => {
    const response = await axios.get<ProfileResponse>(
      API_SPOTIFY + `me?access_token=${accessToken}`
    );
    setUserId(response.data.id);
    return response.data;
  };

  const getUserPlaylist = async () => {
    const response = await axios.get<MyPlaylistResponse>(
      API_SPOTIFY + `me/playlists?access_token=${accessToken}`
    );
    setDataPlaylist(response.data.items);
    return response.data;
  };

  const addTracksToPlaylist = async () => {
    let allTracks = "";
    selectedData.forEach((it: string) => {
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

  const createPlaylist = async (data: FormValue) => {
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
    setForm({
      name: "",
      description: "",
    });
    toast.success("Playlist successfully added");
    return response.data;
  };

  useEffect(() => {
    getProfileUser();
  }, []);

  useEffect(() => {
    if (accessToken) {
      getUserPlaylist();
    }
  }, [accessToken]);

  const handleInputForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createPlaylist(form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (
    url: string = `https://api.spotify.com/v1/search?q=${search}&access_token=${accessToken}&type=track`
  ) => {
    const response = await axios.get<SearchTracksResponse>(url);
    setData(response.data.tracks.items);
    return response.data;
  };

  const handleAdd = () => {
    addTracksToPlaylist();
  };

  const handleSelect = (data: string) => {
    if (selectedData.includes(data)) {
      const findIndex = selectedData.findIndex((v: string) => v === data);
      setSelectedData((prevData: string[]) => {
        const newArr = [
          ...prevData.slice(0, findIndex),
          ...prevData.slice(findIndex + 1, prevData.length),
        ];
        return newArr;
      });
    } else {
      setSelectedData((prevData: string[]) => [...prevData, data]);
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
              <Input
                id="name"
                name="name"
                bg="white"
                onChange={handleInputForm}
                placeholder="Insert your name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                name="description"
                bg="white"
                onChange={handleInputForm}
                rows={3}
                placeholder="Insert your description"
              />
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="bg-[#1db954] mt-6 text-gray-800 px-6 py-2 rounded-full font-bold"
            >
              Add Playlist
            </Button>
          </div>
        </form>

        <hr className="mt-6 " />
      </div>

      <SearchTrack
        search={search}
        handleChange={handleChange}
        handleSearch={handleSearch}
        handleAdd={handleAdd}
        data={data}
        handleSelect={handleSelect}
        playlist={playlist}
        selectedData={selectedData}
        url=""
      />
    </div>
  );
};
export default Home;

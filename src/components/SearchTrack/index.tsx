import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { ItemTrack, SearchTracksResponse } from "../../models/SearchTracks";
import AlbumList from "../AlbumList";

type Props = {
  search: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (url?: string) => Promise<SearchTracksResponse>;
  data: ItemTrack[];
  handleSelect: (data: string) => void;
  selectedData: string[];
  playlist: {
    id: string;
    name: string;
  };
  handleAdd: () => void;
  url: string;
};

const SearchTrack = ({
  handleSearch,
  playlist,
  data,
  handleSelect,
  selectedData,
  handleAdd,
  url,
}: Props) => {
  const [search, setSearch] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <div className="search-box mt-6 text-white flex space-x-2">
        <Input
          id="input-track"
          bg="white"
          value={search}
          onChange={handleChange}
          placeholder="Find tracks that you want"
          className="text-slate-600"
        />
        <div className="btn-wrapper">
          <Button
            width="full"
            className="bg-white text-black w-full py-2 rounded-lg"
            onClick={() => handleSearch(url)}
          >
            Cari
          </Button>
        </div>
      </div>

      <button
        className="w-full bg-[#1db954] mt-2 rounded-full py-2"
        onClick={handleAdd}
      >
        Add to {playlist?.name} Playlist
      </button>

      <div style={{ width: "100%" }} className="text-white mt-4">
        <AlbumList
          data={data}
          handleSelect={handleSelect}
          selectedData={selectedData}
        />
      </div>
    </>
  );
};

export default SearchTrack;

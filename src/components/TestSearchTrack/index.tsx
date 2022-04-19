import axios from "axios";
import { useState } from "react";
import { ItemTrack, SearchTracksResponse } from "../../models/SearchTracks";

const TestSearchTrack = () => {
  const [data, setData] = useState<ItemTrack[]>([]);
  const handleSearch = async () => {
    const response = await axios.get<SearchTracksResponse>("/search");
    setData(response.data.tracks.items);
    return response.data;
  };

  return (
    <div>
      <button onClick={() => handleSearch()}>cari</button>
      {data.length > 0 ? <p>{data[0].album.artists[0].name}</p> : ""}
    </div>
  );
};

export default TestSearchTrack;

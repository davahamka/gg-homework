import data from "./data";
import "./App.css";
import { useEffect, useState } from "react";
import { RiCheckDoubleFill, RiDiscLine } from "react-icons/ri";

const SongList = () => {
  return <div></div>;
};

const AlbumInfo = ({ data, onClick, myPlaylist }) => {
  const dateHoursMin = new Date(Date.UTC(0, 0, 0, 0, 0, 0, data.duration_ms));

  return (
    <div className="album-info">
      <div className="image-box" style={{ position: "relative" }}>
        <div className="overlay"></div>
        <img src={data.album.images[0].url} alt="" />
        <p className="image-box-text">{data.album.artists[0].name}</p>
      </div>
      <div>
        <div className="album-description">
          <p className="album-title">{data.name}</p>
          <p className="album-mini-info">
            {data.disc_number} songs, {dateHoursMin.getUTCMinutes()} hr{" "}
            {dateHoursMin.getUTCSeconds()} min
          </p>

          <p></p>
          <button
            disabled={myPlaylist.includes(data.name)}
            className="btn btn-select"
            onClick={() => {
              onClick(data.name);
            }}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

const Notification = ({ open, message, title }) => {
  return (
    <div className={`notification-box ${open ? "" : "hidden"}`}>
      <RiCheckDoubleFill />
      <div className="notification-message">
        <p className="title">{title}</p>
        <p className="text-mini">{message}</p>
      </div>
    </div>
  );
};

const Header = ({ myPlaylist, removePlaylist }) => {
  return (
    <header>
      <div className="layout header-inner">
        <div>
          <p
            style={{ fontSize: "26pt", display: "flex", alignItems: "center" }}
          >
            m
            <RiDiscLine />
            sic
          </p>
        </div>
        <div className="info-myplaylist" onClick={removePlaylist}>
          Your playlist ({myPlaylist.length})
        </div>
      </div>
    </header>
  );
};

function App() {
  const [myPlaylist, setMyPlaylist] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  }, [open]);

  const onSelectAlbum = (data) => {
    if (myPlaylist.includes(data)) {
      return;
    }
    setOpen(true);
    setSelected(data);
    setMyPlaylist((oldArray) => [...oldArray, data]);
  };

  return (
    <div className="App">
      <Header
        myPlaylist={myPlaylist}
        removePlaylist={() => {
          setMyPlaylist([]);
        }}
      />

      <Notification
        open={open}
        message={`Album ${selected} berhasil ditambahkan`}
        title="Album berhasil ditambahkan"
      />

      <div className="layout">
        <div className="album-wrapper">
          <AlbumInfo
            data={data}
            onClick={onSelectAlbum}
            myPlaylist={myPlaylist}
          />
          <SongList />
        </div>
      </div>
    </div>
  );
}

export default App;

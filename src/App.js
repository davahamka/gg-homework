import data from "./data";
import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import AlbumItem from "./components/AlbumItem";
import Notification from "./components/Notification";

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
          {data.map(item=>(
           <AlbumItem key={item.id} data={item}     onClick={onSelectAlbum}
            myPlaylist={myPlaylist} />
          ))}
        
        </div>
      </div>
    </div>
  );
}

export default App;

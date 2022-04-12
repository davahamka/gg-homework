import AlbumItem from "../AlbumItem";
import styles from "./album-list.module.css";

const AlbumList = ({ data, handleSelect, selectedData }) => {
  return (
    <div className={styles.listAlbum}>
      {data.map((item) => (
        <AlbumItem
          data={item}
          handleSelect={handleSelect}
          selectedData={selectedData}
        />
      ))}
    </div>
  );
};

export default AlbumList;

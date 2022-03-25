import { RiDiscLine } from "react-icons/ri";

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
export default Header;

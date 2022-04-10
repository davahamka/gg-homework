import { formatToMinutesSecond } from "../../utils/formatToMinutesSecond";

const Table = ({ data, handleSelect, selectedData }) => {
  return (
    <table style={{ display: "flex", width: "100%" }}>
      <thead>
        <tr></tr>
      </thead>
      <tbody style={{ width: "100%" }}>
        {data.map((item) => (
          <tr
            key={item.uri}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <td className="">
              <img
                className="img-box"
                src={item.album.images[0].url}
                alt={item.name}
              />
            </td>
            <td width="90%">
              <div>{item.name}</div>
              <div className="item-artist">{item.artists[0].name}</div>
            </td>
            <td className="select-box">
              <div>{formatToMinutesSecond(item.duration_ms)}</div>
              <button
                className="bg-[#1db954] w-[100px] rounded-full py-2 text-gray-800 ml-2"
                onClick={() => {
                  handleSelect(item.uri);
                }}
              >
                {selectedData.includes(item.uri) ? "Deselect" : "Select"}
              </button>
            </td>
          </tr>
        ))}
        <tr></tr>
      </tbody>
    </table>
  );
};

export default Table;

/* eslint-disable no-useless-constructor */
import { Component } from "react";
import { formatToMinutesSecond } from "../../utils/formatToMinutesSecond";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    search: "",
    data: [],
  };

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleSearch = () => {
    fetch(
      "https://api.spotify.com/v1/search?q=" +
        this.state.search +
        "&access_token=" +
        this.props.accessToken +
        "&type=track"
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          data: data.tracks.items,
        });
      });
  };

  render() {
    return (
      <div className="layout" style={{ marginTop: 20 }}>
        <div className="search-box">
          <input
            onChange={this.handleChange}
            placeholder="Find tracks that you want"
          />
          <div className="btn-wrapper">
            <button className="btn" onClick={this.handleSearch}>
              Cari
            </button>
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr></tr>
            </thead>
            <tbody>
              {this.state.data.map((item) => (
                <tr>
                  <td className="">
                    <img
                      className="img-box"
                      src={item.album.images[0].url}
                      alt={item.name}
                    />
                  </td>
                  <td width="100%">
                    <div>{item.name}</div>
                    <div className="item-artist">{item.artists[0].name}</div>
                  </td>
                  <td>{formatToMinutesSecond(item.duration_ms)}</td>
                </tr>
              ))}
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Home;

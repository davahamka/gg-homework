import "./App.css";
import { Component } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";

class App extends Component {
  state = {
    accessToken: window.location.hash
      .substring(1, window.location.hash.length - 1)
      .split("&")[0]
      .split("=")[1],
  };

  render() {
    return (
      <div className="bg-[#121212] min-h-screen">
        {this.state.accessToken ? (
          <Home accessToken={this.state.accessToken} />
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default App;

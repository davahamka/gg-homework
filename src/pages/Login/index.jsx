import { RiSpotifyFill } from "react-icons/ri";

const Login = () => {
  const handleLogin = () => {
    window.open(
      `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/&scope=user-read-email playlist-modify-private playlist-read-private`
    );
  };
  return (
    <div className="App">
      <div className="btn-wrapper">
        <button
          className="bg-[#1db954] flex w-[240px] space-x-2 justify-center  items-center px-4 py-2 rounded-2xl font-semibold text-white"
          onClick={() => handleLogin()}
        >
          <div>
            <RiSpotifyFill className="text-2xl" />
          </div>
          <p>Login with Spotify</p>
        </button>
      </div>
    </div>
  );
};

export default Login;

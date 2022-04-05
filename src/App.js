import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

const App = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  return (
    <div className="bg-[#121212] min-h-screen">
      {accessToken ? <Home /> : <Login />}
    </div>
  );
};

export default App;

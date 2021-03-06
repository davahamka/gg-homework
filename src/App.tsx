import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="bg-[#121212] min-h-screen">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <PrivateRoute path="/create-playlist" component={Home}></PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

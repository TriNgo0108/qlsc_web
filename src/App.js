import "./App.css";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route exact path="/home">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

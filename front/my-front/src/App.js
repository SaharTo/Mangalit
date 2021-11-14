//import {React} from React;
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import { Routes } from "react-router";
import "./App.css";
import { About } from "./cmp/about";
import { Home } from "./cmp/home";
import { Meals } from "./cmp/Meals/meals";
import { Navbar } from "./cmp/navBar";
import { SideMeals } from "./cmp/SideMeals/sideMeals";
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/meals" component={Meals} />
          <Route path="/sideMeals" component={SideMeals} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { About } from "./cmp/about";
import { Home } from "./cmp/home";
import { Meals } from "./cmp/Meals/meals";
import { Meal } from "./cmp/Meal/meal";
import { Navbar } from "./cmp/navBar/navBar";
import { SideMeals } from "./cmp/SideMeals/sideMeals";
import { SideMeal } from "./cmp/sideMeal/sideMeal";
import { SideMealEdit } from "./cmp/sideMealEdit/sideMealEdit";
import { MealEdit } from "./cmp/MealEdit/MealEdit";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/meals/edit/:id?" component={MealEdit} />
          <Route path="/meals/:id" component={Meal} />
          <Route path="/meals" component={Meals} />
          <Route path="/sideMeals/edit/:id?" component={SideMealEdit} />
          <Route path="/sideMeals/:id" component={SideMeal} />
          <Route path="/sideMeals" component={SideMeals} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

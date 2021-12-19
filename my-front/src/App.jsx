import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import React, { useState } from "react";
import "./App.css";
import styles from "./cmp/navBar/navBar.module.css";
import { About } from "./cmp/about";
import { Home } from "./cmp/home/home";
import { Meals } from "./cmp/Meals/meals";
import { Meal } from "./cmp/Meal/meal";
import { Navbar } from "./cmp/navBar/navBar";
import { SideMeals } from "./cmp/SideMeals/sideMeals";
import { SideMeal } from "./cmp/sideMeal/sideMeal";
import { SideMealEdit } from "./cmp/sideMealEdit/sideMealEdit";
import { MealEdit } from "./cmp/MealEdit/MealEdit";
import Login from "./cmp/Login/login";
import Register from "./cmp/Register/register";
import Roulette from "./cmp/roulette/roulette";
import { Admin } from "./cmp/Admin/admin";
import { Parts } from "./cmp/parts/parts";
import SimpleForm from "./cmp/calculator/chatbot";
import { useState } from "react";
import ChangePassword from "./cmp/changePassword/changePassword";
import { topTenMeals } from "./cmp/topTenMeals/topTenMeals";
import { topTenSideMeals } from "./cmp/topTenSideMeals/topTenSideMeals";
//import Beef from "./cmp/parts/beef";

function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState("");`
  //const ss = sessionStorage.getItem("loggedInUser");
  if (!sessionStorage.getItem("loggedInUser")) {
    fetch(`http://localhost:3030/users/checkIfLoggedIn`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      // console.log(res);
      if (res.ok) {
        res.text().then((data) => {
          sessionStorage.setItem("loggedInUser", JSON.stringify(data));
          // setIsLoggedIn(data);
          window.location.reload();
        });
      } else res.text().then((data) => console.log(data));
    });
  }
  const [botIsShown, setBotIsShown] = useState(false);
  const showBotHandler = () => {
    setBotIsShown(!botIsShown);
  };
  const toggelScreen = () => {
    document.getElementById("links").classList.toggle(styles.open);
    document.body.classList.toggle("open");
  };
  return (
    <Router>
      <div>
        <div className="screen" onClick={toggelScreen}></div>
        <Navbar />
        <button id="chatbot" className="chatBotButton" onClick={showBotHandler}>
          מנגלבוט
        </button>
        {botIsShown && <SimpleForm />}
        {/*<div id="mySidenav" class="sideBot">
          <a href="#" id="mangalBot">
            מנגלבוט
          </a>{" "}
        </div>*/}

        {/* <Navbar isLogged={isLoggedIn}/> */}
        <Switch>
          <Route path="/recommendedMeals" component={topTenMeals} />
          <Route path="/recommendedSideMeals" component={topTenSideMeals} />
          <Route path="/changePassword" component={ChangePassword} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Register} />
          <Route path="/admin" component={Admin} />
          <Route path="/parts" component={Parts} />
          <Route path="/about" component={About} />
          <Route path="/meals/save/:id?" component={MealEdit} />
          <Route path="/meals/:id" component={Meal} />
          <Route path="/meals" component={Meals} />
          <Route path="/sideMeals/save/:id?" component={SideMealEdit} />
          <Route path="/sideMeals/:id" component={SideMeal} />
          <Route path="/sideMeals" component={SideMeals} />
          <Route path="/roulette" component={Roulette} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Beef from "./parts/beef";
//import Roulette from "./roulette/roulette";

// const Home = () => {
//   return <div>This is the home page of the god dam Mangalit</div>;
// };
// export default Home;
export class Home extends Component {
  render() {
    return (
      <div dir="rtl">
        <h1 >home page</h1>
        <NavLink className="rndMealsLink" to={`/roulette/`}> לחץ כדי לעבור גלגל של מנות רנדומליות</NavLink>
        <Beef></Beef>
      </div>
    );
  }
}

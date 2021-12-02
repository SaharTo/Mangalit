import React, { Component } from "react";
import Beef from "./parts/beef";
//import Roulette from "./roulette/roulette";

// const Home = () => {
//   return <div>This is the home page of the god dam Mangalit</div>;
// };
// export default Home;
export class Home extends Component {
  render() {
    return (
      <div>
        <h1 dir="rtl">home page</h1>
        <Beef></Beef>
      </div>
    );
  }
}

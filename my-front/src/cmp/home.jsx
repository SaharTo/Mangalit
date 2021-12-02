import React, { Component } from "react";
<<<<<<< HEAD
import Beef from "./parts/beef";
=======
import Roulette from "./roulette/roulette";
>>>>>>> b606cf9ebd93a867cf3d39b2070259fe12de5124

// const Home = () => {
//   return <div>This is the home page of the god dam Mangalit</div>;
// };
// export default Home;
export class Home extends Component {
  render() {
    return (<div>
      <h1 dir="rtl">home page</h1>
      <Roulette />
      </div>
      );
  }
}

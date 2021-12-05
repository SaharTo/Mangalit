import React, { useState, useEffect } from "react";
import lambImage from "../../../assets/lamb.png";
import styles from "./lamb.module.css";
// import meatInfo from "./meatInfoTemp";

const Lamb = () => {
  const [meatState, setMeatState] = useState([]);
  const [markedMeat, setMarkedMeat] = useState([]);
  useEffect(async () => {
    await fetch("http://localhost:3030/meats", { credentials: "include" })
      .then((res) => res.json())
      .then((meats) => setMeatState({ meats }))
      .catch((err) => {
        console.log(err);
      });
    //console.log("meats list ", meats);
  });
  /*componentDidMount() {
    this.getMeats();
    state = {
    meats: null,
  };
  }*/
  /*const getMeats = async () => {
    await fetch("http://localhost:3030/meats", { credentials: "include" })
      .then((res) => res.json())
      .then((meats) => setMeatState({ meats }))
      .catch((err) => {
        console.log(err);
      });
    console.log("meats list ", meats);
  };*/

  const onHoverDiv = async (el) => {
    // console.log("something in the console", el.target.id);
    if (meatState.meats) {
      document.getElementById("name").classList.remove(`${styles.hide}`);
      document.getElementById("desc").classList.remove(`${styles.hide}`);
      const meatInfo = getMeatInfo(el.target.id);
      console.log(meatInfo);
      if (meatInfo) {
        document.getElementById("name").innerText = meatInfo.meatName;
        document.getElementById("desc").innerText = meatInfo.meatDescription;
        setMarkedMeat(meatInfo);
        console.log("afterSetMeatInfo ", markedMeat);
      } else console.log("please hover over exist meat");
      // <div>Hoveringgggg</div>;
    }
  };
  const outHoverDiv = (el) => {
    if (meatState.meats) {
      //document.getElementById("name").classList.add(`${styles.hide}`);
      document.getElementById("desc").classList.add(`${styles.hide}`);
      setMarkedMeat("");
      document.getElementById("name").innerText =
        "רחף עם העכבר מעל לחלק מסויים לפירוט אודותיו";
      document.getElementById("desc").innerText = "";
    }
  };
  const getMeatInfo = (meatName) => {
    console.log("should print the meats array ", meatState.meats);
    const result = meatState.meats.filter((meat) => meat.meatName === meatName);
    console.log("RES ", result);
    if (Object.keys(result).length > 0) {
      console.log("result ", result);
      const relevantResult = {
        meatName: result[0].meatName,
        meatDescription: result[0].meatDescription,
      };
      console.log("relevant result ", relevantResult);
      return relevantResult;
    } else console.log("error");

    //console.log("miao ", result);
  };

  return (
    <div className={styles.meatMap}>
      <img
        src={lambImage}
        useMap="#beefIt"
        alt="Lamb Image"
        className={styles.lambImage}
      ></img>
      <map name="lambIt">
        <div>
          <h1 id="name">רחף עם העכבר מעל לחלק מסויים</h1>
          <div id="desc" className={styles.hide}></div>
        </div>

        <area
          shape="poly"
          coords="136,31,108,129,136,161,164,104,173,50"
          className=""
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          href=""
          id="כתף טלה"
          alt="כתף טלה"
        ></area>
      </map>
    </div>
  );
};
export default Lamb;

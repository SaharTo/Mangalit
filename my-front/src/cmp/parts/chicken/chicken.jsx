import React, { useState, useEffect } from "react";
// import chickenImage from "https://res.cloudinary.com/manglit/image/upload/v1640104956/assets/chicken_f3bmnq.png";
import styles from "./chicken.module.css";
// import meatInfo from "./meatInfoTemp";

const Chicken = () => {
  const [meatState, setMeatState] = useState([]);
  // const [markedMeat, setMarkedMeat] = useState([]);
  useEffect(async () => {
    await fetch("http://localhost:3030/meats", { credentials: "include" })
      .then((res) => res.json())
      .then((meats) => setMeatState({ meats }))
      .catch((err) => {
        console.log(err);
      });
    //console.log("meats list ", meats);
  });

  const onHoverDiv = async (el) => {
    if (meatState.meats) {
      document.getElementById("name").classList.remove(`${styles.hide}`);
      document.getElementById("desc").classList.remove(`${styles.hide}`);
      const meatInfo = getMeatInfo(el.target.id);
      // console.log(meatInfo);
      if (meatInfo) {
        document.getElementById("name").innerText = meatInfo.meatName;
        document.getElementById("desc").innerText = meatInfo.meatDescription;
        // setMarkedMeat(meatInfo);
        // console.log("afterSetMeatInfo ", markedMeat);
      } /*else console.log("please hover over exist meat");*/
    }
  };
  const outHoverDiv = (el) => {
    if (meatState.meats) {
      //document.getElementById("name").classList.add(`${styles.hide}`);
      document.getElementById("desc").classList.add(`${styles.hide}`);
      // setMarkedMeat("");
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
    } /*else console.log("error");*/
  };

  return (
    <div className={styles.chicken}>
      <div className={styles.meatMap}>
        <img
          src="https://res.cloudinary.com/manglit/image/upload/v1640104956/assets/chicken_f3bmnq.png"
          useMap="#beefIt"
          alt="Chicken Image"
          className={styles.chickenImage}
        ></img>
        <map name="chickenIt">
          <div>
            <h1 id="name" className={styles.name}>רחף עם העכבר מעל לחלק מסויים</h1>
            <div id="desc" className={styles.hide && styles.desc}></div>
          </div>

          <area
            shape="poly"
            coords="136,31,108,129,136,161,164,104,173,50"
            className=""
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="חזה עוף"
            alt="חזה עוף"
          ></area>
        </map>
      </div>
      <div className={styles.chickenPhone}>
        {meatState.meats && meatState.meats.filter(m => m.meatType === 'עוף').map(meat => <div key={meat._id}>
          <h3>{meat.meatName}</h3>
          מידע: {meat.meatDescription}
        </div>)}
      </div>
    </div>

  );
};
export default Chicken;

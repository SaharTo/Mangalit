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
    //console.log("meats list ", meatState);
  });

  const onHoverDiv = async (el) => {
    //console.log("entered on hover func")
    if (meatState.meats) {
      document.getElementById("name").classList.remove(`${styles.hide}`);
      document.getElementById("desc").classList.remove(`${styles.hide}`);
      const meatInfo = getMeatInfo(el.target.id);
      //console.log(meatInfo);
      if (meatInfo) {
        document.getElementById("name").innerText = meatInfo.meatName;
        document.getElementById("desc").innerText = meatInfo.meatDescription;
        // setMarkedMeat(meatInfo);
        // console.log("afterSetMeatInfo ", markedMeat);
      } /*else console.log("please hover over exist meat");*/
    }
  };
  const outHoverDiv = (el) => {
    //console.log("entered out hover func")

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
    //console.log("should print the meats array ", meatState.meats);
    const result = meatState.meats.filter((meat) => meat.meatName === meatName);
    //console.log("RES ", result);
    if (Object.keys(result).length > 0) {
      //console.log("result ", result);
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
          useMap="#chickenIt"
          alt="Chicken Image"
          className={styles.chickenImage}
        ></img>
        <map name="chickenIt">
          <div>
            <h1 id="name" className={styles.name}>רחף עם העכבר מעל לחלק מסויים</h1>
            <div dir="rtl" id="desc" className={styles.hide && styles.desc}></div>
          </div>
          <area
            shape="poly"
            coords="83,165,68,130,107,104,127,142,151,157,190,154,205,153,199,159,196,208,180,209,161,189,133,175,99,162"
            className=""
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="גב עוף"
            alt="גב עוף"
          ></area>


          <area
            shape="poly"
            coords="85,280,95,255,118,246,154,249,181,267,178,289,182,287,180,311,165,322,150,323,131,328,112,322,102,310,101,300"
            className=""
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="שוקיים פולקע עוף"
            alt="שוקיים פולקע עוף"
          ></area>
          <area
            shape="poly"
            coords="155,248,181,272,179,287,231,242,226,222"
            className=""
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="ירכיים עוף"
            alt="ירכיים עוף"
          ></area>
          <area
            shape="poly"
            coords="223,221,153,248,119,244,88,229,66,209,69,183,87,166,109,163,130,175,159,189,179,209"
            className=""
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="כנפיים עוף"
            alt="כנפיים עוף"
          ></area>
          <area
            shape="poly"
            coords="84,281,89,261,113,245,90,234,70,218,65,200,68,182,83,167,66,133,49,136,32,135,32,146,35,143,31,199,36,198,43,218,53,236,67,248,74,269,83,279"
            className=""
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="חזה עוף"
            alt="חזה עוף"
          ></area>
        </map>
      </div>
      <div className={styles.chickenPhone}>
        {meatState.meats && meatState.meats.filter(m => m.meatType === 'עוף').filter(m => m.meatNumber).map(meat => <div dir="rtl" key={meat._id}>
          <h3>{meat.meatName}</h3>
          מידע: {meat.meatDescription}
        </div>)}
      </div>
    </div >

  );
};
export default Chicken;

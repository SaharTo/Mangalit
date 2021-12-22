import React, { useState, useEffect } from "react";
// import lambImage from "https://res.cloudinary.com/manglit/image/upload/v1640104954/assets/lamb_fy2nkd.png";
import styles from "./lamb.module.css";
// import meatInfo from "./meatInfoTemp";

const Lamb = () => {
  const [meatState, setMeatState] = useState([]);
  //const [markedMeat, setMarkedMeat] = useState([]);
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
      console.log(meatInfo)
      if (meatInfo) {
        document.getElementById("name").innerText = meatInfo.meatName;
        document.getElementById("desc").innerText = meatInfo.meatDescription;
        //setMarkedMeat(meatInfo);
      } /*else console.log("please hover over exist meat");*/
    }
  };
  const outHoverDiv = (el) => {
    if (meatState.meats) {
      //document.getElementById("name").classList.add(`${styles.hide}`);
      document.getElementById("desc").classList.add(`${styles.hide}`);
      //setMarkedMeat("");
      document.getElementById("name").innerText = "רחף עם העכבר מעל לחלק מסויים לפירוט אודותיו";
      document.getElementById("desc").innerText = "";
    }
  };
  const getMeatInfo = (meatName) => {
    // console.log("should print the meats array ", meatState.meats);
    const result = meatState.meats.filter((meat) => meat.meatName === meatName);
    // console.log("RES ", result);
    if (Object.keys(result).length > 0) {
      // console.log("result ", result);
      const relevantResult = {
        meatName: result[0].meatName,
        meatDescription: result[0].meatDescription,
      };
      // console.log("relevant result ", relevantResult);
      return relevantResult;
    }/* else console.log("error");*/
  };

  return (
    <div className="lamb">
      <div className={styles.meatMap}>
        <img
          src="https://res.cloudinary.com/manglit/image/upload/v1640104954/assets/lamb_fy2nkd.png"
          useMap="#lambIt"
          alt="Lamb Image"
          className={styles.lambImage}
        ></img>
        <map name="lambIt">
          <div>
            <h1 id="name" className={styles.name}>רחף עם העכבר מעל לחלק מסויים</h1>
            <div id="desc" className={styles.hide && styles.desc}></div>
          </div>
          <area
            shape="poly"
            coords="95,58,105,77,101,84,99,94,83,122,73,123,66,136,63,135,54,139,40,141,37,140,37,126,39,120,36,118,37,98,41,92,51,91,85,73,96,56,103,74"
            className=""
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="צוואר טלה"
            alt="צוואר טלה"
          ></area>
          <area
            shape="poly"
            coords="95,58,105,77,101,84,99,94,83,122,73,123,66,136,63,135,54,139,40,141,37,140,37,126,39,120,36,118,37,98,41,92,51,91,85,73,96,56,103,74"
            className=""
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="זרוע טלה"
            alt="זרוע טלה"
          ></area>
          <area
            shape="poly"
            coords="103,78,124,81,148,77,149,103,149,148,155,157,109,161,99,135,85,124,97,101,104,81"
            className=""
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="צלעות טלה"
            alt="צלעות טלה"
          ></area>
          <area
            shape="poly"
            coords="147,84,147,104,147,117,155,157,197,158,201,85,205,77,190,80,151,81"
            className=""
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="אוכף טלה"
            alt="אוכף טלה"
          ></area>
          <area
            shape="poly"
            coords="206,81,201,88,199,159,219,206,239,225,239,241,245,249,237,284,228,306,246,306,246,300,252,293,257,264,259,295,245,317,263,315,267,300,269,300,272,248,269,205,278,160,275,144,282,146,292,127,266,80,209,77"
            className=""
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="שוק טלה"
            alt="שוק טלה"
          ></area>
          <area
            shape="poly"
            coords="198,159,219,206,195,219,111,206,111,163,189,158"
            className=""
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="חזה טלה"
            alt="חזה טלה"
          ></area>
        </map>
      </div>
      <div className={styles.lambPhone}>
        {meatState.meats && meatState.meats.filter(m => m.meatType === 'כבש').map(meat => <div key={meat._id}>
          <h3>{meat.meatNumber} - {meat.meatName}</h3>
          מידע: {meat.meatDescription}
        </div>)}
      </div>
    </div>
  );
};
export default Lamb;

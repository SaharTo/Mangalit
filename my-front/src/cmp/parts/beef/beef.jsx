import BaseComponent from "bootstrap/js/dist/base-component";
import React, { useState, useEffect } from "react";
// import beefImage from "https://res.cloudinary.com/manglit/image/upload/v1640104953/assets/beef_p4bwdd.png";
import styles from "./beef.module.css";
// import meatInfo from "./meatInfoTemp";

const Beef = () => {
  const [meatState, setMeatState] = useState([]);
  // const [markedMeat, setMarkedMeat] = useState([]);

  useEffect(async () => {
    await fetch("/mangal/meats", { credentials: "include" })
      .then((res) => res.json())
      .then((meats) => setMeatState({ meats }))
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const onHoverDiv = async (el) => {
    //console.log("something in the console", el.target.id);
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
      // <div>Hoveringgggg</div>;
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
  const getMeatInfo = (meatNumber) => {
    // console.log("should print the meats array ", meatState.meats);
    const result = meatState.meats.filter(
      (meat) => meat.meatNumber === meatNumber
    );
    //console.log("RES ", result);
    if (Object.keys(result).length > 0) {
      //console.log("result ", result);
      const relevantResult = {
        meatName: result[0].meatName,
        meatDescription: result[0].meatDescription,
      };
      //console.log("relevant result ", relevantResult);
      return relevantResult;
    }/* else console.log("error");*/
  };

  return (
    <div className={styles.beef}>
      <div className={styles.meatMap}>
        <img
          src="https://res.cloudinary.com/manglit/image/upload/v1640104953/assets/beef_p4bwdd.png"
          useMap="#beefIt"
          alt="Beef Image"
          className={styles.beefImage}
        ></img>
        <map name="beefIt">
          <div>
            <h1 id="name" className={styles.name}>
              רחף עם העכבר מעל לחלק מסויים
            </h1>
            <div dir="rtl" id="desc" className={styles.hide && styles.desc} ></div>
          </div>

          <area
            shape="poly"
            coords="136,31,108,129,136,161,164,104,173,50"
            className="numberTen"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="10"
            alt="number 10"
          ></area>
          <area
            shape="poly"
            coords="174,49,164,105,190,118,254,107,273,60,214,56"
            className="numberTwo"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="2"
            alt="number 2"
          ></area>
          <area
            shape="poly"
            coords="164,105,146,152,187,156,207,118,190,118"
            className="numberNine"
            onMouseOut={outHoverDiv}
            onMouseOver={onHoverDiv}
            id="9"
            alt="number 9"
          ></area>
          <area
            shape="poly"
            coords="145,153,136,163,156,215,200,231,192,205,195,193,187,181,188,165,185,163,189,155"
            className="numberThree"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="3"
            alt="number 3"
          ></area>
          <area
            shape="poly"
            coords="188,165,189,182,197,193,192,207,212,269,243,267,257,230,260,208,256,198,248,203,233,205,237,155,217,149,205,159"
            className="numberEight"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="8"
            alt="number 8"
          ></area>
          <area
            shape="poly"
            coords="186,162,207,11,254,108,205,159"
            className="numberSix"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="6"
            alt="number 6"
          ></area>
          <area
            shape="poly"
            coords="218,149,237,156,268,141,283,138,282,109,255,107"
            className="numberFive"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="5"
            alt="number 5"
          ></area>
          <area
            shape="poly"
            coords="236,155,233,204,246,204,273,177,271,172,282,138,264,142"
            className="numberFour"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="4"
            alt="number 4"
          ></area>
          <area
            shape="poly"
            coords="285,134,347,135,346,92,334,5,273,62,256,107,283,110"
            className="numberOne"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="1"
            alt="number 1"
          ></area>
          <area
            shape="poly"
            coords="272,172,284,133,348,135,347,173"
            className="numberNine"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="9"
            alt="number 9"
          ></area>
          <area
            //number three is marked twice becuse its still the breast part
            shape="poly"
            coords="271,173,272,177,257,198,260,207,257,230,329,218,341,201,346,173"
            className="numberThree"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="3"
            alt="number 3"
          ></area>
          <area
            shape="poly"
            coords="348,137,348,173,339,203,329,218,411,219,423,237,447,238,459,243,475,217,427,174,422,156,433,143"
            className="numberSeventeen"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="17"
            alt="number 17"
          ></area>
          <area
            shape="poly"
            coords="334,58,345,92,348,135,467,145,469,113,486,90,454,84,416,104,394,103,396,90,367,83,404,64,387,56"
            className="numberEleven"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="11"
            alt="number 11"
          ></area>
          <area
            //number twelve is inside number eleven, make sure its works fine, actually it doesnt worked, so I change a liitle bit number eleven
            shape="poly"
            coords="368,86,395,88,395,104,413,105,453,86,406,64"
            className="numberTwelve"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="12"
            alt="number 12"
          ></area>
          <area
            shape="poly"
            coords="385,55,411,64,453,84,486,88,518,47,473,42"
            className="numberThirteen"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="13"
            alt="number 13"
          ></area>
          <area
            shape="poly"
            coords="486,90,519,90,538,60,532,49,519,46"
            className="numberSixteen"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="16"
            alt="number 16"
          ></area>
          <area
            shape="poly"
            coords="467,191,459,173,464,145,467,145,469,115,486,90,520,92,514,102,511,146,534,220,505,198,481,190"
            className="numberFifteen"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="15"
            alt="number 15"
          ></area>
          <area
            shape="poly"
            coords="478,216,466,176,468,147,439,146,428,159,431,177"
            className="numberFourteen"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="14"
            alt="number 14"
          ></area>
          <area
            shape="poly"
            coords="468,191,478,220,498,244,539,276,559,262,543,235,510,200"
            className="numberEighteen"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="18"
            alt="number 18"
          ></area>
          <area
            shape="poly"
            coords="537,60,514,102,511,147,526,203,549,117"
            className="numberNineteen"
            onMouseOver={onHoverDiv}
            onMouseOut={outHoverDiv}
            id="19"
            alt="number 19"
          ></area>
        </map>
      </div>
      <div className={styles.beefPhone}>
        {meatState.meats && meatState.meats.filter(m => m.meatType === 'בקר').filter(m => m.meatNumber).map(meat => <div key={meat._id}>
          <h3> {meat.meatNumber} -  {meat.meatName}</h3>
          מידע: {meat.meatDescription}
        </div>)}
      </div>
    </div>
  );
};
export default Beef;

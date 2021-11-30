import { object } from "joi";
import React, { useState, useEffect } from "react";
import beefImage from "../../assets/beef.png";
import styles from "./beef.module.css";
import meatInfo from "./meatInfoTemp";

const Beef = () => {
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
  };
  const outHoverDiv = (el) => {
    document.getElementById("name").classList.add(`${styles.hide}`);
    document.getElementById("desc").classList.add(`${styles.hide}`);
  };
  const getMeatInfo = (meatNumber) => {
    console.log("should print the meats array ", meatState.meats);
    const result = meatState.meats.filter(
      (meat) => meat.meatNumber === meatNumber
    );
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
    <div>
      <h1>The map and area elements</h1>
      <map name="beefIt">
        <div>
          <h1 id="name">רחף עם העכבר מעל לחלק מסויים</h1>
          <div id="desc" className={styles.hide}>
            info
          </div>
        </div>

        <area
          shape="poly"
          coords="325,283,369,334,425,158,368,128"
          className="numberTen"
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          href=""
          id="10"
          alt="number 10"
        ></area>
        <area
          shape="poly"
          coords="426,158,412,243,452,267,551,249,582,179"
          className="numberTwo"
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          href=""
          id="2"
          alt="number 2"
        ></area>
        <area
          shape="poly"
          coords="411,247,383,317,391,321,449,324,477,267,454,269"
          className="numberNine"
          onMouseOut={outHoverDiv}
          onMouseOver={onHoverDiv}
          href=""
          id="9"
          alt="number 9"
        ></area>
        <area
          shape="poly"
          coords="383,320,367,337,397,416,465,442,453,402,462,385,447,364,449,338,445,337,449,325"
          className="numberThree"
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          href=""
          id="3"
          alt="number 3"
        ></area>
        <area
          shape="poly"
          coords="485,502,533,497,555,440,560,406,552,391,541,397,516,398,523,324,494,314,473,329,449,336,448,364,462,382,454,402,466,441"
          className="numberEight"
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          href=""
          id="8"
          alt="number 8"
        ></area>
        <area
          shape="poly"
          coords="445,337,479,327,552,250,478,263"
          className="numberSix"
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          href=""
          id="6"
          alt="number 6"
        ></area>
        <area
          shape="poly"
          coords="495,313,523,325,595,297,595,255,583,250,552,249"
          className="numberFive"
          href=""
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          id="5"
          alt="number 5"
        ></area>
        <area
          shape="poly"
          coords="516,398,542,397,579,353,577,351,594,297,572,300,525,323"
          className="numberFour"
          href=""
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          id="4"
          alt="number 4"
        ></area>
        <area
          shape="poly"
          coords="552,250,563,253,588,251,598,257,597,289,694,293,693,226,675,171,581,178"
          className="numberOne"
          href=""
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          id="1"
          alt="number 1"
        ></area>
        <area
          shape="poly"
          coords="599,290,578,350,694,350,694,292"
          className="numberNine"
          href=""
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          id="9"
          alt="number 9"
        ></area>
        <area
          //number three is marked twice becuse its still the breast part
          shape="poly"
          coords="579,351,579,354,553,390,559,404,556,438,666,420,683,397,693,350"
          className="numberThree"
          href=""
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          id="3"
          alt="number 3"
        ></area>
        <area
          shape="poly"
          coords="667,420,799,418,793,425,812,450,855,454,861,459,891,420,817,351,812,323,828,303,696,293,694,349,692,396"
          className="numberSeventeen"
          href=""
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          id="17"
          alt="number 17"
        ></area>
        <area
          shape="poly"
          coords="674,171,692,228,696,293,880,305,884,255,909,220,859,212,796,243,766,242,769,219,725,212,785,181,751,166"
          className="numberEleven"
          href=""
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          id="11"
          alt="number 11"
        ></area>
        <area
          //number twelve is inside number eleven, make sure its works fine, actually it doesnt worked, so I change a liitle bit number eleven
          shape="poly"
          coords="726,213,770,220,767,243,803,241,858,214,831,200,788,183,775,184,726,210"
          className="numberTwelve"
          href=""
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          id="12"
          alt="number 12"
        ></area>
        <area
          shape="poly"
          coords="750,165,795,184,857,211,908,218,956,155,890,146"
          className="numberThirteen"
          href=""
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          id="13"
          alt="number 13"
        ></area>
        <area
          shape="poly"
          coords="908,219,962,223,989,173,982,156,958,155"
          className="numberSixteen"
          href=""
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          id="16"
          alt="number 16"
        ></area>
        <area
          shape="poly"
          coords="909,220,883,257,879,307,874,307,868,344,881,378,948,393,996,440,973,394,971,396,949,311,953,240,962,224"
          className="numberFifteen"
          href=""
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          id="15"
          alt="number 15"
        ></area>
        <area
          shape="poly"
          coords="827,304,812,324,818,354,895,422,869,349,874,306"
          className="numberFourteen"
          href=""
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          id="14"
          alt="number 14"
        ></area>
        <area
          shape="poly"
          coords="882,381,895,422,990,510,1023,487,1002,447,950,395,909,379"
          className="numberEighteen"
          href=""
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          id="18"
          alt="number 18"
        ></area>
        <area
          shape="poly"
          coords="971,396,1008,262,990,173,951,242,948,307"
          className="numberNineteen"
          href=""
          onMouseOver={onHoverDiv}
          onMouseOut={outHoverDiv}
          id="19"
          alt="number 19"
        ></area>
      </map>
      <img src={beefImage} useMap="#beefIt" alt="Beef Image"></img>
    </div>
  );
};
export default Beef;

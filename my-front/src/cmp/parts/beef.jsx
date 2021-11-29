import beefImage from "../../assets/beef.png";
import styles from "./beef.module.css";

const Beef = () => {
  const onHoverDiv = () => {
    console.log("something in the console");
    //<div>Hoveringgggg</div>;
  };
  return (
    <div>
      <h1>The map and area elements</h1>
      <map name="beefIt">
        <div className={styles.hideTen}>Meat Number 10, Breast</div>
        <area
          shape="poly"
          coords="325,283,369,334,425,158,368,128"
          //className={styles.numberTen}
          onMouseOver={onHoverDiv()}
          href=""
          alt="number 10"
        ></area>

        <area
          shape="poly"
          coords="426,158,412,243,452,267,551,249,582,179"
          className="numberTwo"
          href=""
          alt="number 2"
        ></area>
        <area
          shape="poly"
          coords="411,247,383,317,391,321,449,324,477,267,454,269"
          className="numberNine"
          href=""
          alt="number 9"
        ></area>
        <area
          shape="poly"
          coords="383,320,367,337,397,416,465,442,453,402,462,385,447,364,449,338,445,337,449,325"
          className="numberThree"
          href=""
          alt="number 3"
        ></area>
        <area
          shape="poly"
          coords="485,502,533,497,555,440,560,406,552,391,541,397,516,398,523,324,494,314,473,329,449,336,448,364,462,382,454,402,466,441"
          className="numberEight"
          href=""
          alt="number 8"
        ></area>
        <area
          shape="poly"
          coords="445,337,479,327,552,250,478,263"
          className="numberSix"
          href=""
          alt="number 6"
        ></area>
        <area
          shape="poly"
          coords="495,313,523,325,595,297,595,255,583,250,552,249"
          className="numberFive"
          href=""
          alt="number 5"
        ></area>
        <area
          shape="poly"
          coords="516,398,542,397,579,353,577,351,594,297,572,300,525,323"
          className="numberFour"
          href=""
          alt="number 4"
        ></area>
        <area
          shape="poly"
          coords="552,250,563,253,588,251,598,257,597,289,694,293,693,226,675,171,581,178"
          className="numberOne"
          href=""
          alt="number 1"
        ></area>
        <area
          shape="poly"
          coords="599,290,578,350,694,350,694,292"
          className="numberNine"
          href=""
          alt="number 9"
        ></area>
        <area
          //number three is marked twice becuse its still the breast part
          shape="poly"
          coords="579,351,579,354,553,390,559,404,556,438,666,420,683,397,693,350"
          className="numberThree"
          href=""
          alt="number 3"
        ></area>
        <area
          shape="poly"
          coords="667,420,799,418,793,425,812,450,855,454,861,459,891,420,817,351,812,323,828,303,696,293,694,349,692,396"
          className="numberSeventeen"
          href=""
          alt="number 17"
        ></area>
        <area
          shape="poly"
          coords="674,171,695,292,879,307,885,254,908,220,856,210,748,167"
          className="numberEleven"
          href=""
          alt="number 11"
        ></area>
        <area
          //number twelve is inside number eleven, make sure its works fine
          shape="poly"
          coords="726,213,770,220,767,243,803,241,858,214,831,200,788,183,775,184,726,210"
          className="numberTwelve"
          href=""
          alt="number 12"
        ></area>
        <area
          shape="poly"
          coords="750,165,795,184,857,211,908,218,956,155,890,146"
          className="numberThirteen"
          href=""
          alt="number 13"
        ></area>
        <area
          shape="poly"
          coords="908,219,962,223,989,173,982,156,958,155"
          className="numberSixteen"
          href=""
          alt="number 16"
        ></area>
        <area
          shape="poly"
          coords="909,220,883,257,879,307,874,307,868,344,881,378,948,393,996,440,973,394,971,396,949,311,953,240,962,224"
          className="numberFifteen"
          href=""
          alt="number 15"
        ></area>
        <area
          shape="poly"
          coords="827,304,812,324,818,354,895,422,869,349,874,306"
          className="numberFourteen"
          href=""
          alt="number 14"
        ></area>
        <area
          shape="poly"
          coords="882,381,895,422,990,510,1023,487,1002,447,950,395,909,379"
          className="numberEighteen"
          href=""
          alt="number 18"
        ></area>
        <area
          shape="poly"
          coords="971,396,1008,262,990,173,951,242,948,307"
          className="numberNineteen"
          href=""
          alt="number 19"
        ></area>
      </map>
      <img src={beefImage} useMap="#beefIt" alt="Beef Image"></img>
    </div>
  );
};
export default Beef;

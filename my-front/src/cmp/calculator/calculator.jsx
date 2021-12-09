import { useEffect, useState } from "react";
import styles from "./calculator.module.css";
const Calculator = () => {
  const [men, setMen] = useState("");
  const [women, setWomen] = useState("");
  const [pitotSalatim, setPitotSalatim] = useState(false);

  /* useEffect(async () => {
    /*const questionsArray = [
      "כמה גברים?",
      "כמה נשים?",
      "עם או בלי פיתות וסלטים?",
    ];
    //console.log("meats list ", meats);
  });
  */
  const addToScreen = (e) => {
    const s = String.concat(document.getElementById("screen"), e);
    document.getElementById("screen").innerHTML = s;
  };
  const finishHandler = () => {
    if (pitotSalatim) {
      const meatQuantity = parseInt(men) * 0.4 + parseInt(women) * 0.3; //Avg meat quantity for men and women consumers with Pitot and Salatim
      document.getElementById("screen").innerHTML = meatQuantity;
    }
  };
  const onsubmitHandler = () => {
    // console.log(document.getElementById("screen").value);
    if (document.getElementById("q") === "כמה גברים?") {
      setMen(document.getElementById("screen"));
      document.getElementById("screen").innerHTML = "";
      document.getElementById("q").innerHTML = "כמה נשים?";
    }
    if (document.getElementById("q") === "כמה נשים?") {
      setWomen(document.getElementById("screen"));
      document.getElementById("screen").innerHTML = "";
      document.getElementById("q").innerHTML = "עם או בלי פיתות וסלטים";
    }
    if (document.getElementById("q") === "עם או בלי פיתות וסלטים") {
      if (document.getElementById("screen") === "עם") {
        setPitotSalatim(true);
      }
      document.getElementById("screen").innerHTML = "";
      document.getElementById("q").innerHTML = "=";
      finishHandler();
    }
  };
  return (
    <div dir="rtl" className={styles.calculatorDiv}>
      <div>
        <label value="כמה גברים?" htmlFor="screen" className={styles.q}>
          כמה גברים?
        </label>
      </div>
      <div>
        <input
          value={men}
          className={styles.screenInpt}
          id="screen"
          type="text"
        />
      </div>
      <div>
        <button className={styles.firstLine} id="one">
          1
        </button>
        <button className={styles.firstLine} id="two">
          2
        </button>
        <button className={styles.firstLine} id="three">
          3
        </button>
      </div>
      <div>
        <button className={styles.secondLine} id="four">
          4
        </button>
        <button className={styles.secondLine} id="five">
          5
        </button>
        <button className={styles.secondLine} id="six">
          6
        </button>
      </div>
      <div>
        <button className={styles.thirdLine} id="seven">
          7
        </button>
        <button className={styles.thirdLine} id="eight">
          8
        </button>
        <button className={styles.thirdLine} id="nine">
          9
        </button>
      </div>
      <span className={styles.fourthLine}>
        <button className={styles.zeroButton} id="zero">
          0
        </button>
        <button
          className={styles.submitButton}
          id="submit"
          onClick={onsubmitHandler}
        >
          V
        </button>
      </span>
    </div>
  );
};
export default Calculator;

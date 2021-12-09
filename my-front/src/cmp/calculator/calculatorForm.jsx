import { useState } from "react";
import styles from "./calculatorForm.module.css";
const CalculatorForm = () => {
  const [meatQ, setMeatQ] = useState();
  const [men, setMen] = useState();
  const [women, setWomen] = useState();
  const [withOrWithout, setWithOrWithout] = useState();

  const changeMenHandler = ({ target }) => {
    setMen(target.value);
  };
  const changeWomenHandler = ({ target }) => {
    setWomen(target.value);
  };
  const calculate = (m, w, p) => {
    console.log("inside calculate func ", m, w, p);
    if (p === "עם") {
      const meatQuantity = m * 0.4 + w * 0.2;
      setMeatQ(meatQuantity);
    }
    if (p === "בלי") {
      const meatQuantity = m * 0.8 + w * 0.6;
      setMeatQ(meatQuantity);
    }
  };

  return (
    <div className={styles.bigDiv}>
      <form
      /*onSubmit={Calculate(
          document.getElementById("men"),
          document.getElementById("women"),
          document.getElementById("men")
        )}*/
      >
        <h1>מחשבון לעלהאש</h1>
        <label htmlFor="men">כמה גברים?</label>
        <input
          id="men"
          type="number"
          min="1"
          max="100"
          value={men}
          onChange={changeMenHandler}
        ></input>
        <label htmlFor="women">כמה נשים?</label>
        <input
          id="women"
          type="number"
          min="1"
          max="100"
          onChange={changeWomenHandler}
        ></input>
        <label htmlFor="pitot">עם פיתות וסלטים?</label>
        <input id="pitot" type="string"></input>

        <button /*onClick={Calculate}*/></button>
      </form>
      <label>כמות בשר לעל האש:</label>
      <label>{meatQ}</label>
    </div>
  );
};
export default CalculatorForm;

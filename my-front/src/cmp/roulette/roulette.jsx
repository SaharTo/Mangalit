import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import styles from "./roulette.module.css";
import { NavLink } from "react-router-dom";

export default function Roulette() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [rouletteMeals, setRouletteMeals] = useState([]);

  useEffect(async () => {
    await fetch("/mangal/meals/rndMeals", { credentials: "include", })
      .then((res) => res.json())
      .then((meals) => setRouletteMeals(meals))
      .catch((err) => alert(err));
  }, []);

  const data = rouletteMeals.map((meal) => {
    return { option: meal.mealName, mealId: meal._id };
  });

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    document.getElementById("mealLink").classList.add(`${styles.hidden}`);
    document.getElementById("spinBtn").disabled = true;
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div className={styles.roulette}>
      <button id="spinBtn" onClick={handleSpinClick}>
        סובב את הגלגל
      </button>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);
          document.getElementById("spinBtn").disabled = false;
          document.getElementById("mealLink").classList.remove(`${styles.hidden}`);
        }}
        backgroundColors={["#3e3e3e", "#df3428"]}
        textColors={["#ffffff"]}
      />
      {data[prizeNumber] && (
        <NavLink
          dir="rtl"
          id="mealLink"
          className={styles.hidden}
          to={`/meals/${data[prizeNumber].mealId}`}
        >
          לחץ כדי לעבור למנה: {data[prizeNumber].option}
        </NavLink>
      )}
    </div>
  );
}

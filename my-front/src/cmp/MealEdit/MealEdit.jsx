import React, { Component } from "react";
import styles from "./mealEdit.module.css";
import Chosen from "../helpers/chosen";

export class MealEdit extends Component {
  state = {
    meal: null,
    addOrEdit: null,
    meat: null,
    sideMeals: null,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.setState({ addOrEdit: "edit" });
      this.getMeal(id);
    } else {
      this.setState({ addOrEdit: "add" });
      this.getEmptyMeal();
      this.getMeatInfo();
      this.getRecommendeSideMeals();
    }
  }
  goBack = () => {
    const id = this.props.match.params.id;
    if (id) {
      this.props.history.push(`/meals/${id}`);
    } else {
      this.props.history.push("/meals/");
    }
  };

  getMeatInfo = async () => {
    fetch(`http://localhost:3030/meats`, { credentials: "include" })
      .then((res) => res.json())
      .then((meat) => this.setState({ meat }))
      .catch((error) => {
        console.log(error);
      });
  };

  getRecommendeSideMeals = async () => {
    fetch(`http://localhost:3030/sideMeals`, { credentials: "include" })
      .then((res) => res.json())
      .then((sideMeals) => this.setState({ sideMeals }))
      .catch((error) => {
        console.log(error);
      });
  };

  getMeal = async (id) => {
    await fetch(`http://localhost:3030/meals/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((meal) => this.setState({ meal }))
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      meat: this.state.meal.mealMeatInfo,
      sideMeals: this.state.meal.mealRecommendedSideMeals,
    });
  };

  getEmptyMeal = async () => {
    const meal = {
      mealName: "",
      mealSummary: "",
      mealMeatInfo: [],
      mealPreparationTechniques: "",
      mealPreparationTime: "",
      mealPreparationDifficult: "",
      mealNumberOfPeopleItSuits: "",
      mealRecommendedSideMeals: [],
      mealImage: [],
      mealMeatQuantityGram: "",
      mealAdditionalIngredients: "",
      mealTotalPrice: "",
      mealDescription: "",
    };
    this.setState({ meal });
  };
  handleChange = ({ target }) => {
    const field = target.id;
    const value = target.value;
    this.setState((prevState) => ({
      meal: { ...prevState.meal, [field]: value },
    }));
  };

  handleSelectChangeMeat = (data) => {
    const mealMeatInfo = data.map((m) => m.value);
    this.setState((prevState) => ({
      meal: { ...prevState.meal, mealMeatInfo },
    }));
  };
  handleSelectChangeSideMeals = (data) => {
    const mealRecommendedSideMeals = data.map((m) => m.value);
    this.setState((prevState) => ({
      meal: { ...prevState.meal, mealRecommendedSideMeals },
    }));
  };

  handleFiles = async ({ target }) => {
    const field = target.id;
    const files = target.files
    const images = [];
    for (let i = 0; i < files.length; i++) {
      images.push(files[i])
    }
    this.setState((prevState) => ({
      meal: { ...prevState.meal, [field]: images },
    }));
  };

  onSaveMeal = async (ev) => {
    ev.preventDefault();
    console.log("after     ", this.state);
    const { meal } = this.state;
    const id = this.props.match.params.id;
    if (id) {
      delete meal._id;
      delete meal.mealReviews;
      delete meal.mealAuthor;
      delete meal.mealIsRecommended;
      delete meal.__v;
      fetch(`http://localhost:3030/meals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ meal: meal }),
      })
        .then(() => this.goBack())
        .catch((err) => console.log(err));
    } else {
      console.log('post meal ',meal);
      fetch(`http://localhost:3030/meals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ meal: meal }),
      })
        .then(() => this.goBack())
        .catch((err) => console.log(err));
    }
  };

  render() {
    const { meal, meat, addOrEdit, sideMeals } = this.state;
    if (!meal || !meat || !sideMeals) return <h1 dir="rtl">טוען...</h1>;
    const optMeat = meat.map((m) => {
      return { label: m.meatName, value: m._id };
    });
    const optSideMeals = sideMeals.map((sm) => {
      return { label: sm.sideMealName, value: sm._id };
    });
    return (
      <div dir="rtl" className={styles.edit}>
        {addOrEdit === "edit" && <h1>עדכון מנה</h1>}
        {addOrEdit === "add" && <h1>יצירת מנה חדשה</h1>}
        <form className={styles.meal} name="meal">
          <label htmlFor="mealName">שם המנה:</label>
          <input
            type="text"
            value={meal.mealName}
            id="mealName"
            name="mealName"
            onChange={this.handleChange}
          />
          <label htmlFor="mealSummary">פירוט המנה:</label>
          <input
            type="text"
            value={meal.mealSummary}
            name="mealSummary"
            id="mealSummary"
            onChange={this.handleChange}
          />
          <label htmlFor="mealDescription">אופן ההכנה:</label>
          <textarea
            rows="10"
            cols="50"
            value={meal.mealDescription}
            name="mealDescription"
            id="mealDescription"
            onChange={this.handleChange}
          />
          <label htmlFor="mealPreparationDifficult">רמת קושי:</label>
          <select
            id="mealPreparationDifficult"
            name="mealPreparationDifficult"
            value={meal.mealPreparationDifficult}
            onChange={this.handleChange}
          >
            <option value="" disabled="disabled">
              בחר
            </option>
            <option value="קל">קל</option>
            <option value="בינוני">בינוני</option>
            <option value="קשה">קשה</option>
          </select>
          <label htmlFor="mealPreparationTechniques">טכניקת הכנה:</label>
          <select
            id="mealPreparationTechniques"
            name="mealPreparationTechniques"
            value={meal.mealPreparationTechniques}
            onChange={this.handleChange}
          >
            <option value="" disabled="disabled">
              בחר
            </option>
            <option value="תנור">תנור</option>
            <option value="מנגל">מנגל</option>
            <option value="מחבת">מחבת</option>
            {/*<option value="גז">גז</option>*/}
          </select>
          {addOrEdit === "edit" && (
            <label htmlFor="mealMeatInfo">סוג בשר:</label>
          )}
          {addOrEdit === "edit" && (
            <input
              type="text"
              value={meal.mealMeatInfo.map((m) => m.meatName)}
              disabled="disabled"
            />
          )}
          {addOrEdit === "add" && (
            <label htmlFor="mealMeatInfo">סוג בשר:</label>
          )}
          {addOrEdit === "add" && (
            <Chosen
              opt={optMeat}
              parentCallback={this.handleSelectChangeMeat}
            />
          )}
          {addOrEdit === "edit" && (
            <label htmlFor="mealRecommendedSideMeals">מנות צד מומלצות:</label>
          )}
          {addOrEdit === "edit" && (
            <input
              type="text"
              value={meal.mealRecommendedSideMeals.map((sm) => sm.sideMealName)}
              disabled="disabled"
            />
          )}
          {addOrEdit === "add" && (
            <label htmlFor="mealRecommendedSideMeals">מנות צד מומלצות:</label>
          )}
          {addOrEdit === "add" && (
            <Chosen
              opt={optSideMeals}
              parentCallback={this.handleSelectChangeSideMeals}
            />
          )}
          <label htmlFor="mealMeatQuantityGram">משקל הבשר (בגרם):</label>
          <input
            type="number"
            max="5000"
            min="200"
            value={meal.mealMeatQuantityGram}
            name="mealMeatQuantityGram"
            id="mealMeatQuantityGram"
            onChange={this.handleChange}
          />
          <label htmlFor="mealPreparationTime">זמן הכנה (דקות):</label>
          <input
            type="number"
            min="5"
            max="500"
            value={meal.mealPreparationTime}
            name="mealPreparationTime"
            id="mealPreparationTime"
            onChange={this.handleChange}
          />
          <label htmlFor="mealAdditionalIngredients">מרכיבים נוספים:</label>
          <textarea
            rows="3"
            cols="30"
            value={meal.mealAdditionalIngredients}
            name="mealAdditionalIngredients"
            id="mealAdditionalIngredients"
            onChange={this.handleChange}
          />
          <label htmlFor="mealNumberOfPeopleItSuits">
            לכמה אנשים זה מתאים:
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={meal.mealNumberOfPeopleItSuits}
            name="mealNumberOfPeopleItSuits"
            id="mealNumberOfPeopleItSuits"
            onChange={this.handleChange}
          />
          <label htmlFor="mealTotalPrice">מחיר:</label>
          <input
            type="number"
            min="5"
            value={meal.mealTotalPrice}
            name="mealTotalPrice"
            id="mealTotalPrice"
            onChange={this.handleChange}
          />
          <label htmlFor="mealImage" className={styles.btn}>
            לחץ כדי להוסיף תמונות
            <input type="file" id="mealImage" hidden onChange={this.handleFiles} multiple />
          </label>
        </form>
        {meal.mealImage.length > 0 && meal.mealImage.map((img) => <p>{img.name}</p>)}
        <div className={styles.buttons}>
          <button className={styles.btn} onClick={this.onSaveMeal}>
            שמירה
          </button>
          <button className={styles.btn} onClick={this.goBack}>
            חזרה לדף הקודם
          </button>
        </div>
      </div>
    );
  }
}

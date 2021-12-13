import React, { Component } from "react";
import { uploadImg } from "../helpers/uploadImg";
import styles from "./sideMealEdit.module.css";

export class SideMealEdit extends Component {
  state = {
    sideMeal: null,
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) this.getSideMeal(id);
    else this.getEmptySideMeal();
  }
  goBack = () => {
    const id = this.props.match.params.id;
    if (id) this.props.history.push(`/sideMeals/${id}`);
    else this.props.history.push("/sideMeals/");
  };

  getSideMeal = async (id) => {
    fetch(`http://localhost:3030/sideMeals/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((sideMeal) => this.setState({ sideMeal }))
      .catch((err) => {
        console.log(err);
      });
  };
  getEmptySideMeal = async () => {
    const sideMeal = {
      sideMealName: "",
      sideMealSummary: "",
      sideMealDifficult: "",
      sideMealEstimatedPrice: "",
      sideMealIngriedents: "",
      sideMealImageUrl:[],
      sideMealPreperationDescription: "",
      sideMealPreperationEstimatedTime: "",
      sideMealnumberOfPeopleItSuits: "",
    };
    this.setState({ sideMeal });
  };

  handleChange = ({ target }) => {
    const field = target.id;
    const value = target.value;
    this.setState((prevState) => ({
      sideMeal: { ...prevState.sideMeal, [field]: value },
    }));
  };

  handleFiles = async ({ target }) => {
    const field = target.id;
    const files = target.files
    const image = [];
    for (let i = 0; i < files.length; i++) {
      image.push(files[i]);
    }
    this.setState((prevState) => ({
      sideMeal: { ...prevState.sideMeal, [field]: image },
    }));
  };

  onSaveSideMeal = async (ev) => {
    ev.preventDefault();
    const { sideMeal } = this.state;
    const id = this.props.match.params.id;
    const images = []
    for (let i = 0; i < sideMeal.sideMealImageUrl.length; i++) {
      const res = await uploadImg(sideMeal.sideMealImageUrl[i])
      images.push(res)
    }
    sideMeal.sideMealImageUrl = images;
    if (id) {
      delete sideMeal._id;
      delete sideMeal.sideMealsReviews;
      delete sideMeal.sideMealsAuthor;
      delete sideMeal.__v;
      fetch(`http://localhost:3030/sideMeals/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sideMeal: sideMeal }),
      })
        .then(() => this.goBack())
        .catch((err) => console.log(err));
    } else {
      fetch(`http://localhost:3030/sideMeals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ sideMeal: sideMeal }),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => console.log(data));
          this.goBack()
        } else res.text().then((data) => console.log(data));
      });
    }
  };

  render() {
    const { sideMeal } = this.state;
    if (!sideMeal) return <h1 dir="rtl">טוען...</h1>;
    return (
      <div dir="rtl" className={styles.edit}>
        {this.props.match.params.id ? (
          <h1>עריכת מנת צד</h1>
        ) : (
          <h1>יצירת מנה חדשה</h1>
        )}
        <form className={styles.sideMeal} name="sideMeal">
          <label htmlFor="sideMealName">שם המנה:</label>
          <input
            type="text"
            value={sideMeal.sideMealName}
            id="sideMealName"
            name="sideMealName"
            onChange={this.handleChange}
          />
          <label htmlFor="sideMealSummary">פירוט:</label>
          <input
            type="text"
            value={sideMeal.sideMealSummary}
            name="sideMealSummary"
            id="sideMealSummary"
            onChange={this.handleChange}
          />
          <label htmlFor="sideMealDifficult">רמת קושי:</label>
          <select
            id="sideMealDifficult"
            name="sideMealDifficult"
            value={sideMeal.sideMealDifficult}
            onChange={this.handleChange}
          >
            <option value="" disabled="disabled">
              בחר
            </option>
            <option value="קל">קל</option>
            <option value="בינוני">בינוני</option>
            <option value="קשה">קשה</option>
          </select>
          <label htmlFor="sideMealIngriedents">מרכיבים:</label>
          <textarea
            rows="3"
            cols="30"
            value={sideMeal.sideMealIngriedents}
            name="sideMealIngriedents"
            id="sideMealIngriedents"
            onChange={this.handleChange}
          />
          <label htmlFor="sideMealPreperationDescription">אופן ההכנה:</label>
          <textarea
            rows="10"
            cols="50"
            value={sideMeal.sideMealPreperationDescription}
            name="sideMealPreperationDescription"
            id="sideMealPreperationDescription"
            onChange={this.handleChange}
          />
          <label htmlFor="sideMealPreperationEstimatedTime">זמן ההכנה:</label>
          <input
            type="number"
            min="5"
            max="60"
            value={sideMeal.sideMealPreperationEstimatedTime}
            name="sideMealPreperationEstimatedTime"
            id="sideMealPreperationEstimatedTime"
            onChange={this.handleChange}
          />
          <label htmlFor="sideMealnumberOfPeopleItSuits">
            לכמה אנשים זה מתאים:
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={sideMeal.sideMealnumberOfPeopleItSuits}
            name="sideMealnumberOfPeopleItSuits"
            id="sideMealnumberOfPeopleItSuits"
            onChange={this.handleChange}
          />
          <label htmlFor="sideMealEstimatedPrice">מחיר:</label>
          <input
            type="number"
            min="5"
            max="100"
            value={sideMeal.sideMealEstimatedPrice}
            name="sideMealEstimatedPrice"
            id="sideMealEstimatedPrice"
            onChange={this.handleChange}
          />
        </form>
        <label htmlFor="sideMealImageUrl" className={styles.btn}>
            לחץ כדי להוסיף תמונות
            <input type="file" id="sideMealImageUrl" name="files[]" hidden onChange={this.handleFiles} multiple />
          </label>
        <div className={styles.buttons}>
          <button className={styles.btn} onClick={this.onSaveSideMeal}>
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

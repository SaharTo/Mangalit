import React, { Component } from "react";
import { uploadImg } from "../helpers/uploadImg";
import styles from "./sideMealEdit.module.css";

export class SideMealEdit extends Component {
  state = {
    sideMeal: null,
    slideIndex: 1,
    files: [],
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) this.getSideMeal(id);
    else this.getEmptySideMeal();
  }
  componentDidUpdate() {
    this.showSlides(this.state.slideIndex)
  }
  goBack = () => {
    const id = this.props.match.params.id;
    if (id) this.props.history.push(`/sideMeals/${id}`);
    else this.props.history.push("/sideMeals/");
  };

  getSideMeal = async (id) => {
    fetch(`https://immense-inlet-06578.herokuapp.com/sideMeals/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((sideMeal) => this.setState({ sideMeal }))
      .catch((err) => {
        alert(err);
      });
  };
  getEmptySideMeal = async () => {
    const sideMeal = {
      sideMealName: "",
      sideMealSummary: "",
      sideMealDifficult: "",
      sideMealEstimatedPrice: "",
      sideMealIngriedents: "",
      sideMealImageUrl: [],
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
    const file = target.files
    const arrFiles = [];
    for (let i = 0; i < file.length; i++) {
      arrFiles.push(file[i]);
    }
    this.setState({ files: arrFiles });
  };

  onSaveSideMeal = async (ev) => {
    ev.preventDefault();
    const { sideMeal, files } = this.state;
    const id = this.props.match.params.id;
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImg(files[i])
      sideMeal.sideMealImageUrl.push(url)
    }
    if (id) {
      delete sideMeal._id;
      delete sideMeal.sideMealsReviews;
      delete sideMeal.sideMealsAuthor;
      delete sideMeal.__v;
      fetch(`https://immense-inlet-06578.herokuapp.com/sideMeals/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sideMeal: sideMeal }),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => console.log(data));
          this.goBack()
        } else res.text().then((msg) => {
          if (msg === 'sideMealPreperationDescription') alert("אופן ההכנה צריך להיות מעל ל10 תווים")
          else if (msg === 'sideMealIngriedents') alert("מרכיבים צריך להיות מעל ל3 תווים")
          else alert(msg);
        });
      });
    } else {
      fetch(`https://immense-inlet-06578.herokuapp.com/sideMeals/`, {
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
        } else res.text().then((msg) => {
          if (msg === 'sideMealPreperationDescription') alert("אופן ההכנה צריך להיות מעל ל10 תווים")
          else if (msg === 'sideMealIngriedents') alert("מרכיבים צריך להיות מעל ל3 תווים")
          else alert(msg);
        });
      });
    }
  };

  deleteImg = () => {
    const index = this.state.slideIndex;
    console.log(index);
    const newImgs = this.state.sideMeal.sideMealImageUrl;
    const newFiles = this.state.files;
    if (index > newImgs.length) {
      newFiles.splice(index - newImgs.length - 1, 1);
      this.setState({ files: newFiles });
    }
    else {
      newImgs.splice(index - 1, 1);
      this.setState((prevState) => ({
        sideMeal: { ...prevState.sideMeal, sideMealImageUrl: newImgs },
      }));
    }
    this.setState({ slideIndex: 1 })
  }

  prevSlides = () => {
    const index = this.state.slideIndex - 1
    this.setState({ slideIndex: index })
    this.showSlides(index);
  }
  nextSlides = () => {
    const index = this.state.slideIndex + 1
    this.setState({ slideIndex: index })
    this.showSlides(index);
  }
  showSlides = (num) => {
    const slides = document.getElementsByName("sideMealEditSlide");
    if (slides.length > 0) {
      if (num > slides.length) this.setState({ slideIndex: 1 })
      if (num < 1) this.setState({ slideIndex: slides.length })
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove(styles.show);
      }
      slides[this.state.slideIndex - 1].classList.add(styles.show);
    }
  }

  render() {
    const id = this.props.match.params.id;
    const { sideMeal, files } = this.state;
    if (!sideMeal) return <h1 dir="rtl">טוען...</h1>;
    return (
      <div dir="rtl" className={styles.edit}>
        <div className={styles.buttons}>
          <button className={styles.btn} onClick={this.goBack}>
            חזרה לדף הקודם
          </button>
        </div>
        {id ? (
          <h1>עריכת מנת צד</h1>
        ) : (
          <h1>יצירת מנה חדשה</h1>
        )}
        <div className={styles.formImage}>
          <form className={styles.sideMeal} name="sideMeal" autoComplete="off" onSubmit={this.onSaveSideMeal}>
            <label htmlFor="sideMealName">שם המנה:</label>
            <input
              type="text"
              value={sideMeal.sideMealName}
              id="sideMealName"
              name="sideMealName"
              onChange={this.handleChange}
              pattern="[^0-9\x22]+.{1,15}"
              title="שדה זה חייב להיות מתחת ל-15 אותיות וללא מספרים"
              required
            />
            <label htmlFor="sideMealSummary">פירוט:</label>
            <input
              type="text"
              value={sideMeal.sideMealSummary}
              name="sideMealSummary"
              id="sideMealSummary"
              onChange={this.handleChange}
              pattern=".{5,}"
              title="שדה זה חייב להיות מעל ל-5 תווים "
              required
            />
            <label htmlFor="sideMealDifficult">רמת קושי:</label>
            <select
              id="sideMealDifficult"
              name="sideMealDifficult"
              value={sideMeal.sideMealDifficult}
              onChange={this.handleChange}
              title="בחר אפשרות"
              required
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
              pattern=".{3,}"
              title="שדה זה חייב להיות מעל ל-3 תווים "
              required
            />
            <label htmlFor="sideMealPreperationDescription">אופן ההכנה:</label>
            <textarea
              rows="10"
              cols="50"
              value={sideMeal.sideMealPreperationDescription}
              name="sideMealPreperationDescription"
              id="sideMealPreperationDescription"
              onChange={this.handleChange}
              pattern=".{10,}"
              title="שדה זה חייב להיות מעל ל-10 תווים "
              required
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
              title="שדה זה חייב להיות אך ורק מספרים "
              required
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
              title="שדה זה חייב להיות אך ורק מספרים "
              required
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
              title="שדה זה חייב להיות אך ורק מספרים "
              required
            />
            <button className={styles.btn} /*onClick={this.onSaveSideMeal}*/>
              שמירה
            </button>
          </form>
          <div className={styles.imagesBtn}>
            <label htmlFor="sideMealImageUrl" className={styles.btn}>
              לחץ כדי להוסיף תמונות
              <input type="file" id="sideMealImageUrl" name="files[]" hidden onChange={this.handleFiles} multiple />
            </label>

            {id && <div className={styles.images}>
              {sideMeal.sideMealImageUrl.length > 0 && sideMeal.sideMealImageUrl.map((url) =>
                <div name="sideMealEditSlide" key={url}>
                  <img src={url} alt='' />
                </div>
              )}
              {files.length > 0 && files.map(f => <div name="sideMealEditSlide" key={f.name}>
                <img src={URL.createObjectURL(f)} alt='' />
              </div>)}
              {sideMeal.sideMealImageUrl.length + files.length > 0 && <div className={styles.prevNext}>
                {sideMeal.sideMealImageUrl.length + files.length > 1 && <button className={styles.prev} onClick={this.prevSlides}>&#10094;</button>}
                <button className={styles.deleteImg} onClick={this.deleteImg}>הסרת תמונה</button>
                {sideMeal.sideMealImageUrl.length + files.length > 1 && <button className={styles.next} onClick={this.nextSlides}>&#10095;</button>}
              </div>}
            </div>}
            {!id && <div className={styles.images}>
              {files.length > 0 && files.map(f => <div name="sideMealEditSlide" key={f.name}>
                <img src={URL.createObjectURL(f)} alt='' />
              </div>)}
              {files.length > 0 && <div className={styles.prevNext}>
                {files.length > 1 && <button className={styles.prev} onClick={this.prevSlides}>&#10094;</button>}
                <button className={styles.deleteImg} onClick={this.deleteImg}>הסרת תמונה</button>
                {files.length > 1 && <button className={styles.next} onClick={this.nextSlides}>&#10095;</button>}
              </div>}
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import styles from "./mealEdit.module.css";
import Chosen from "../helpers/chosen";
import { uploadImg } from "../helpers/uploadImg";

export class MealEdit extends Component {
  state = {
    meal: null,
    addOrEdit: null,
    meat: null,
    sideMeals: null,
    slideIndex: 1,
    files: [],
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

  componentDidUpdate() {
    this.showSlides(this.state.slideIndex)
  }

  goBack = () => {
    const id = this.props.match.params.id;
    if (id) this.props.history.push(`/meals/${id}`);
    else this.props.history.push("/meals/");
  };

  getMeatInfo = async () => {
    fetch(`/mangal/meats`, { credentials: "include" })
      .then((res) => res.json())
      .then((meat) => this.setState({ meat }))
      .catch((error) => {
        alert(error);
      });
  };

  getRecommendeSideMeals = async () => {
    fetch(`/mangal/sideMeals`, { credentials: "include" })
      .then((res) => res.json())
      .then((sideMeals) => this.setState({ sideMeals }))
      .catch((error) => {
        alert(error);
      });
  };

  getMeal = async (id) => {
    await fetch(`/mangal/meals/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((meal) => this.setState({ meal }))
      .catch((err) => {
        alert(err);
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
    const file = target.files
    const arrFiles = [];
    for (let i = 0; i < file.length; i++) {
      arrFiles.push(file[i]);
    }
    this.setState({ files: arrFiles });
  };

  onSaveMeal = async (ev) => {
    ev.preventDefault();
    // console.log("after     ", this.state);
    document.getElementById("saveBtn").classList.add(`${styles.hidden}`);

    const { meal, files } = this.state;
    const id = this.props.match.params.id;
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImg(files[i])
      //uploadImg is a function that upload the following files to cloudinary and return the cloudinary url for this file
      meal.mealImage.push(url)
    }
    // console.log(meal);
    if (id) {
      delete meal._id;
      delete meal.mealReviews;
      delete meal.mealAuthor;
      delete meal.mealIsRecommended;
      delete meal.__v;
      fetch(`/mangal/meals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ meal: meal }),
      })
        .then((res) => {
          if (res.ok) {
            res.text().then((data) => {
              this.goBack();
            });
          } else res.text().then((msg) => {
            if (msg === 'mealDescription') alert("???????? ?????????? ???????? ?????????? ?????? ??10 ??????????")
            else if (msg === 'mealAdditionalIngredients') alert("?????????????? ???????????? ???????? ?????????? ?????? ??3 ??????????")
            else alert(msg);
          });
        });
    } else {
      // console.log("post meal ", meal);
      fetch(`/mangal/meals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ meal: meal }),
      })
        .then((res) => {
          if (res.ok) {
            res.text().then(() => {
              this.goBack();
            });
          } else res.text().then((msg) => {
            if (msg === 'mealDescription') alert("???????? ?????????? ???????? ?????????? ?????? ??10 ??????????")
            else if (msg === 'mealAdditionalIngredients') alert("?????????????? ???????????? ???????? ?????????? ?????? ??3 ??????????")
            else alert(msg);
          });
        });
    }
    document.getElementById("saveBtn").classList.remove(`${styles.hidden}`);
  };

  deleteImg = () => {
    const index = this.state.slideIndex;
    const newImgs = this.state.meal.mealImage;
    const newFiles = this.state.files;
    if (index > newImgs.length) {
      newFiles.splice(index - newImgs.length - 1, 1);
      this.setState({ files: newFiles });
    }
    else {
      newImgs.splice(index - 1, 1);
      this.setState((prevState) => ({
        meal: { ...prevState.meal, mealImage: newImgs },
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
    const slides = document.getElementsByName("mealEditSlide");
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
    const { meal, meat, addOrEdit, sideMeals, files } = this.state;
    if (!meal || !meat || !sideMeals) return <h1 dir="rtl">????????...</h1>;
    const optMeat = meat.map((m) => {
      return { label: m.meatName, value: m._id };
    });
    const optSideMeals = sideMeals.map((sm) => {
      return { label: sm.sideMealName, value: sm._id };
    });
    return (
      <div dir="rtl" className={styles.edit}>
        <div className={styles.buttons}>
          <button className={styles.btn} onClick={this.goBack}>
            ???????? ?????? ??????????
          </button>
        </div>
        {addOrEdit === "edit" && <h1>?????????? ??????</h1>}
        {addOrEdit === "add" && <h1>?????????? ?????? ????????</h1>}
        <div className={styles.formImage}>
          <form className={styles.meal} name="meal" onSubmit={this.onSaveMeal} autoComplete="off"
          >
            <label htmlFor="mealName">???? ????????:</label>
            <input
              className={styles.mealInput}
              type="text"
              value={meal.mealName}
              id="mealName"
              name="mealName"
              onChange={this.handleChange}
              pattern="[^0-9\x22]+.{1,15}"
              title="?????? ???? ???????? ?????????? ???????? ??-15 ???????????? ???????? ????????????"
              required
            />
            <label htmlFor="mealSummary">?????????? ????????:</label>
            <input
              className={styles.mealInput}
              type="text"
              value={meal.mealSummary}
              name="mealSummary"
              id="mealSummary"
              onChange={this.handleChange}
              pattern=".{5,}"
              title="?????? ???? ???????? ?????????? ?????? ??-5 ?????????? "
              required
            />
            <label htmlFor="mealDescription">???????? ??????????:</label>
            <textarea
              rows="10"
              cols="50"
              value={meal.mealDescription}
              name="mealDescription"
              id="mealDescription"
              onChange={this.handleChange}
              pattern=".{10,}"
              title="?????? ???? ???????? ?????????? ?????? ??-10 ?????????? "
              required
            />
            <label htmlFor="mealPreparationDifficult">?????? ????????:</label>
            <select
              id="mealPreparationDifficult"
              name="mealPreparationDifficult"
              value={meal.mealPreparationDifficult}
              onChange={this.handleChange}
              title="?????? ????????????"
              required
            >
              <option value="" disabled="disabled">
                ??????
              </option>
              <option value="????">????</option>
              <option value="????????????">????????????</option>
              <option value="??????">??????</option>
            </select>
            <label htmlFor="mealPreparationTechniques">???????????? ????????:</label>
            <select
              id="mealPreparationTechniques"
              name="mealPreparationTechniques"
              value={meal.mealPreparationTechniques}
              onChange={this.handleChange}
              title="?????? ????????????"
              required
            >
              <option value="" disabled="disabled">
                ??????
              </option>
              <option value="????????">????????</option>
              <option value="????????">????????</option>
              <option value="????????">????????</option>
              {/*<option value="????">????</option>*/}
            </select>
            {addOrEdit === "edit" && (
              <label htmlFor="mealMeatInfo">?????? ??????:</label>
            )}
            {addOrEdit === "edit" && (
              <input
                className={styles.mealInput}
                type="text"
                value={meal.mealMeatInfo.map((m) => m.meatName)}
                disabled="disabled"
              />
            )}
            {addOrEdit === "add" && (
              <label htmlFor="mealMeatInfo">?????? ??????:</label>
            )}
            {addOrEdit === "add" && (
              <Chosen
                opt={optMeat}
                parentCallback={this.handleSelectChangeMeat}
              />
            )}
            {addOrEdit === "edit" && (
              <label htmlFor="mealRecommendedSideMeals">???????? ???? ??????????????:</label>
            )}
            {addOrEdit === "edit" && (
              <input
                className={styles.mealInput}
                type="text"
                value={meal.mealRecommendedSideMeals.map((sm) => sm.sideMealName)}
                disabled="disabled"
              />
            )}
            {addOrEdit === "add" && (
              <label htmlFor="mealRecommendedSideMeals">???????? ???? ??????????????:</label>
            )}
            {addOrEdit === "add" && (
              <Chosen
                opt={optSideMeals}
                parentCallback={this.handleSelectChangeSideMeals}
                required
              />
            )}
            <label htmlFor="mealMeatQuantityGram">???????? ???????? (????????):</label>
            <input
              className={styles.mealInput}
              type="number"
              max="5000"
              min="200"
              value={meal.mealMeatQuantityGram}
              name="mealMeatQuantityGram"
              id="mealMeatQuantityGram"
              onChange={this.handleChange}
              /*pattern="[0-9]"*/
              title="?????? ???? ???????? ?????????? ???? ?????? ???????????? "
              required
            />
            <label htmlFor="mealPreparationTime">?????? ???????? (????????):</label>
            <input
              className={styles.mealInput}
              type="number"
              min="5"
              max="500"
              value={meal.mealPreparationTime}
              name="mealPreparationTime"
              id="mealPreparationTime"
              onChange={this.handleChange}
              title="?????? ???? ???????? ?????????? ???? ?????? ???????????? "
              required />
            <label htmlFor="mealAdditionalIngredients">?????????????? ????????????:</label>
            <textarea
              rows="3"
              cols="30"
              value={meal.mealAdditionalIngredients}
              name="mealAdditionalIngredients"
              id="mealAdditionalIngredients"
              onChange={this.handleChange}
              pattern=".{3,}"
              title="?????? ???? ???????? ?????????? ?????? ??-3 ?????????? "
              required
            />
            <label htmlFor="mealNumberOfPeopleItSuits">
              ???????? ?????????? ???? ??????????:
            </label>
            <input
              className={styles.mealInput}
              type="number"
              min="1"
              max="30"
              value={meal.mealNumberOfPeopleItSuits}
              name="mealNumberOfPeopleItSuits"
              id="mealNumberOfPeopleItSuits"
              onChange={this.handleChange}
              required
            />
            <label htmlFor="mealTotalPrice">????????:</label>
            <input
              className={styles.mealInput}
              type="number"
              max='2000'
              min="5"
              value={meal.mealTotalPrice}
              name="mealTotalPrice"
              id="mealTotalPrice"
              onChange={this.handleChange}
              required
            />
            <button id="saveBtn" className={styles.saveBtn} /*onClick={this.onSaveMeal}*/>
              ??????????
            </button>
          </form>
          <div className={styles.imagesBtn}>
            <label htmlFor="mealImage" className={styles.btn}>
              ?????? ?????? ???????????? ????????????
              <input
                type="file"
                id="mealImage"
                hidden
                onChange={this.handleFiles}
                multiple
              />
            </label>
            {addOrEdit === "edit" && <div className={styles.mealImages}>
              {meal.mealImage.length > 0 && meal.mealImage.map((url) =>
                <div name="mealEditSlide" key={url}>
                  <img src={url} alt='' />
                </div>
              )}
              {files.length > 0 && files.map(f => <div name="mealEditSlide" key={f.name}>
                <img src={URL.createObjectURL(f)} alt='' />
              </div>)}
              {meal.mealImage.length + files.length > 0 && <div className={styles.prevNext}>
                {meal.mealImage.length + files.length > 1 && <button className={styles.prev} onClick={this.prevSlides}>&#10094;</button>}
                <button className={styles.deleteImg} onClick={this.deleteImg}>???????? ??????????</button>
                {meal.mealImage.length + files.length > 1 && <button className={styles.next} onClick={this.nextSlides}>&#10095;</button>}
              </div>}
            </div>}
            {addOrEdit === "add" && <div className={styles.mealImages}>
              {files.length > 0 && files.map(f => <div name="mealEditSlide" key={f.name}>
                <img src={URL.createObjectURL(f)} alt='' />
              </div>)}
              {files.length > 0 && <div className={styles.prevNext}>
                {files.length > 1 && <button className={styles.prev} onClick={this.prevSlides}>&#10094;</button>}
                <button className={styles.deleteImg} onClick={this.deleteImg}>???????? ??????????</button>
                {files.length > 1 && <button className={styles.next} onClick={this.nextSlides}>&#10095;</button>}
              </div>}
            </div>}
          </div>
        </div >
      </div >
    );
  }
}

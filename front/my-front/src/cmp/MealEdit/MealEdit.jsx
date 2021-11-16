import React, { Component } from "react";


export class MealEdit extends Component {
    state = {
        meal: null,
    };
    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) this.getMeal(id);
    };
    goBack = () => {
        const id = this.props.match.params.id;
        if (id) this.props.history.push(`/meals/${id}`);
        else this.props.history.push('/meals/');
    };

    getMeal = async (id) => {
        fetch(`http://localhost:3030/meals/${id}`)
            .then(res => res.json())
            .then(meal => this.setState({ meal }))
            .catch(err => {
                console.log(err);
            })
    };

    handleChange = ({ target }) => {
        const field = target.id;
        const value = target.value;
        this.setState((prevState) => ({
            meal: { ...prevState.meal, [field]: value },
        }));
    };
    onSaveMeal = async (ev) => {
        ev.preventDefault();
        const { meal } = this.state;
        const id = this.props.match.params.id;
        if (id) {
            delete meal._id
            delete meal.mealReviews
            delete meal.mealAuthor
            delete meal.mealIsRecommended
            delete meal.__v
            fetch(`http://localhost:3030/meals/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "meal": meal })
            })
                .then(() => this.goBack())
                .catch(err => console.log(err))
        }
    };

    render() {
        const { meal } = this.state;
        if (!meal) return <div>Loading...</div>;
        return (
            <div /*dir="rtl"*/ className='edit'>
                <h1>Edit Meal</h1>
                <form className="meal-edit" name='meal'>
                    <label htmlFor="mealName">Name:
                        <input type="text" value={meal.mealName} id="mealName" name="mealName" onChange={this.handleChange} />
                    </label>
                    <label htmlFor="mealSummary">Summary:
                        <input type="text" value={meal.mealSummary} name="mealSummary" id="mealSummary" onChange={this.handleChange} />
                    </label>
                    <label htmlFor="mealDescription">Description:
                        <textarea rows="10" cols="50" value={meal.mealDescription} name="mealDescription" id="mealDescription" onChange={this.handleChange} />
                    </label>
                    <label htmlFor="mealPreparationDifficult">Difficult:
                        <select id="mealPreparationDifficult" name="mealPreparationDifficult" value={meal.mealPreparationDifficult} onChange={this.handleChange}>
                            <option value="easy">קל</option>
                            <option value="medium">בינוני</option>
                            <option value="hard">קשה</option>
                        </select>
                    </label>
                    <label htmlFor="mealPreparationTechniques">Techniques:
                        <select id="mealPreparationTechniques" name="mealPreparationTechniques" value={meal.mealPreparationTechniques} onChange={this.handleChange}>
                            <option value="oven">oven</option>
                            <option value="grill">grill</option>
                            <option value="pan">pan</option>
                            <option value="gas">gas</option>
                        </select>
                    </label>
                    <label htmlFor="mealMeatQuantityGram">Meat Quantity Gram:
                        <input type="number" min='100' value={meal.mealMeatQuantityGram} name="mealMeatQuantityGram" id="mealMeatQuantityGram" onChange={this.handleChange} />
                    </label>
                    <label htmlFor="mealPreparationTime">Preparation Time:
                        <input type="number" min='100' value={meal.mealPreparationTime} name="mealPreparationTime" id="mealPreparationTime" onChange={this.handleChange} />
                    </label>
                    <label htmlFor="mealAdditionalIngredients">Ingriedents:
                        <textarea rows="3" cols="30" value={meal.mealAdditionalIngredients} name="mealAdditionalIngredients" id="mealAdditionalIngredients" onChange={this.handleChange} />
                    </label>
                    <label htmlFor="mealNumberOfPeopleItSuits">People It Suits:
                        <input type="number" min='1' max='30' value={meal.mealNumberOfPeopleItSuits} name="mealNumberOfPeopleItSuits" id="mealNumberOfPeopleItSuits" onChange={this.handleChange} />
                    </label>
                    <label htmlFor="mealTotalPrice">Price:
                        <input type="number" min='5' value={meal.mealTotalPrice} name="mealTotalPrice" id="mealTotalPrice" onChange={this.handleChange} />
                    </label>
                    <div >
                        <button onClick={this.onSaveMeal}>Save</button>
                        <button onClick={this.goBack}> Go Back</button>
                    </div>
                </form>
            </div>
        );
    };
};

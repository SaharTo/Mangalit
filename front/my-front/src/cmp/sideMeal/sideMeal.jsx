import React, { Component } from "react";
import { Link } from 'react-router-dom';


export class SideMeal extends Component {
    state = {
        sideMeal: null,
    };
    componentDidMount() {
        this.getSideMeal();
    }
    goBack = () => {
        this.props.history.push('/sideMeals');
    };

    getSideMeal = async () => {
        const id = this.props.match.params.id;
        fetch(`http://localhost:3030/sideMeals/${id}`)
            .then(res => res.json())
            .then(sideMeal => this.setState({ sideMeal }))
            .catch(err => {
                console.log(err);
            })
    };

    deleteSideMeal = async (ev, sideMealId) => {
        fetch(`http://localhost:3030/sideMeals/${sideMealId}`, { method: 'DELETE' })
            .then(() => this.goBack())
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        const { sideMeal } = this.state;
        if (!sideMeal) return <h1>Loading...</h1>;
        return (
            <div  className="sideMeal" >
                <h1>Name: {sideMeal.sideMealName}</h1>
                <p>Summary: {sideMeal.sideMealSummary}</p>
                <p>Difficult: {sideMeal.sideMealDifficult}</p>
                <p>Ingriedents: {sideMeal.sideMealIngriedents}</p>
                <p>Preperation Description: {sideMeal.sideMealPreperationDescription}</p>
                <p>Preperation Estimated Time: {sideMeal.sideMealPreperationEstimatedTime}</p>
                <p>number Of People It Suits: {sideMeal.sideMealnumberOfPeopleItSuits}</p>
                <p>Price: {sideMeal.sideMealEstimatedPrice}₪</p>
                <p>Author: {sideMeal.sideMealsAuthor.fullName}</p>
                {sideMeal.sideMealsReviews.map((review) => {
                    return <div key={review._id}>
                        <p>review: {review.reviewBody}  author: {review.reviewAuthor.fullName}</p>
                    </div>
                })}
                <button onClick={(ev) => this.deleteSideMeal(ev, sideMeal._id)}> Delete</button>
                <Link to={'/sideMeals/edit/' + sideMeal._id}><button> Edit</button></Link>
                <button onClick={this.goBack}> Back To All SideMeals</button>
                {/* <Link to={'/sideMeals/' + sideMeal._id}><img src='sideMeal.sideMealImageUrl' alt="img" /></Link> */}
            </div>
        );
    }
}

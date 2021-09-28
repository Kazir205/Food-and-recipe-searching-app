import React from "react";
import './foodApp.css'
import Loading from "./Loading";

const Recipe = ({id, title, calories, img, ingredients}) => {
    return(
        
        <div key={calories}>
            <div className="image-container2">
            <img className="image" src={img} alt="" />

            <p className="calories">Calories: {Math.round(calories, 0)}</p>
            </div>
            <div className="body">
            <h1 className="title">{title}</h1>
    
            <ol className="lists">
               {ingredients.map(ingredient => (
                 <li className="list">{ingredient.text}</li>
               ))}
            </ol>
            </div>
        </div>
    )
}

export default Recipe;
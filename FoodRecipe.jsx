import React, { useEffect, useState } from 'react'
import Recipe from './Recipe';
import './foodApp.css'
import Loading from './Loading';



export default function FoodRecipe() {
    const APP_ID = "a011d1e4";
    const APP_KEYS = "b5766ed1fd2994df7711dcecbe3b6bef"

    const [recipes, setRecipes] = useState([])
    //search state
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('chicken')
    //loading
    const [loading, setLoading] = useState('')
    const [loadingState, setLoadingState] = useState(false)
    //data not found
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        getRecipes()
        console.log("fetching data")
        setLoading(`Searching ${search} `)
        setLoadingState(true)
    }, [query])

    const getSearch = (e) => {
        e.preventDefault()
        setQuery(search)
    }

    const gotoHome = (e) => {
        e.preventDefault()
        setQuery('chicken')
        setNotFound(false)
    }

    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEYS}`);
        const data = await response.json()
        if(response && data) {
            setLoading("")
            setLoadingState(false)
        }
        setRecipes(data.hits)
        console.log(data.hits)
        if(data.hits.length == 0) {
            console.log("nothing found")
            setNotFound(true)
        }else {
            console.log("found manything")
            setNotFound(false)
        }
    }

  

    return (
        <div className="food-wrapper">
           <form type="text" onSubmit={getSearch} className="searchForm">
               <input className="searchbar" type="text"
               autoComplete
               placeholder="search your favorite recipe"
               value={search}
               onChange={(e) => setSearch(e.currentTarget.value)}
               />
               <button className="searchButton" onClick={getSearch} type="submit">
                    Search
               </button>
           </form>
            {loadingState && <Loading text={loading} />}
           <div className="food-container">
               {notFound && <Data__Not__found searchFunc={gotoHome}/>}
           {recipes.map(recipe => 
           (
               <Recipe title={recipe.recipe.label} calories={recipe.recipe.calories}
               img={recipe.recipe.image}
               ingredients={recipe.recipe.ingredients}
               />
           ))}
           </div>
        </div>
    )
}

const Data__Not__found = ({searchFunc}) => {

    return <div className="notFound">
        <h5>Sorry, nothing found!
            <br/>please check your search keywords or network connection</h5>
            <button className="searchButton" onClick={searchFunc}>Back to home</button>
    </div>
}

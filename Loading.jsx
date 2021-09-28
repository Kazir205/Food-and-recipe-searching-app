import React from 'react'
import './foodApp.css'

function Loading({text}) {
    return (
        <div className="loadingContainer">
            <h3>{text}</h3>
            <div className="loadingCircle"></div>
        </div>
    )
}

export default Loading

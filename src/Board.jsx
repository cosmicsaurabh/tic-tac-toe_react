import React from "react";
import"./styles.css"

export default function Board({squares, onClick}){
    const Square = ( {value, onClick}) =>(
    <button className={`square ${value}`} onClick={onClick}>
        {value}
    </button>
    );
    return(
    <div className="board">
        {squares.map( ( square, index) =>(
            <Square
                key = {index}
                value = {square}
                onClick = { () => onClick(index)}
             />

        ))}
    </div>)
}

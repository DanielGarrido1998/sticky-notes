import React from "react";
import "./style.css"

//estructura de la nota, se le pasan tanto la tarea como la descripcion de esta
function ItemTarea(props) {

    const noteClass = props.important ? "note-important" : "note-normal";

    return(
        <div className="col">
            <div className={`${noteClass}`}>
                <p className="title">- {props.tarea}</p>
                <p className="desc">{props.description}</p>
            </div>
        </div>
    );
}

export default ItemTarea;
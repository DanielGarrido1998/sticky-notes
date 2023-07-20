import React, { useEffect, useRef, useState } from "react";
import ItemTarea from "./ItemTarea";
import { v4 as uuid } from 'uuid';
import './style.css'


//funcion principal que muestra el formulario, agrega y recupera las notas del LocalStorage
function ListaTareas() {

    const [tareas, setTareas] = useState([]);

    const tareaRef = useRef();
    const tareadescRef = useRef();
    const sladercheckRef = useRef();
    const KEY = "sticky-notes"

    //recupera las notas desde el localStorage
    useEffect( ()=> {
        const mistareas = JSON.parse(localStorage.getItem(KEY));
        if (mistareas){
            setTareas(mistareas)
        }
    },[]);

    //almacenar las notas en el localStorage cuando se produzca un cambio en el array
    useEffect(() => {
        const json = JSON.stringify(tareas);
        console.log(json)
        localStorage.setItem(KEY , json);
    },[tareas]);

    //agrega las tareas con su titulo y descripcion
    const agregarNota = () => {
        const tarea = tareaRef.current.value;
        const description = tareadescRef.current.value;
        const sladercheck = sladercheckRef.current.checked;      

        if (description === '') return;

        setTareas( (prev) => {
            const nuevaTarea = {
                id:uuid(),
                tarea:tarea,
                description:description,
                important:sladercheck
            }
            return [...prev, nuevaTarea];
        });

        tareaRef.current.value = '';
        tareadescRef.current.value = '';
        sladercheckRef.current.checked = false;
    }

    //2 input (titulo, descripcion) + checkbox para nota de prioridad y boton agregar
    // se recorrerá una lista de las tareas para mostrarlas
    return(
        <>
        <h2 className="PrincipalTitle">Sticky Notes</h2>
        <input id="title" ref={tareaRef} className="form-control" placeholder="Titulo de tarea (Opcional)"></input>
        <input id="desc" ref={tareadescRef} className="form-control" placeholder="Ingrese la descripción"></input>
        <div id="checkbox" className="form-check form-switch">
            <input className="form-check-input"  ref={sladercheckRef} type="checkbox"></input>
            <label className="form-check-label" for="flexSwitchCheckDefault">Tarea Primordial</label>
        </div>
        <button id="boton" onClick={agregarNota} className="btn btn-primary ms-2">Agregar</button>
        <div className="row">
            {tareas.map((t) => (
                <ItemTarea key={t.id} tarea={t.tarea} description={t.description} important={t.important}></ItemTarea>
            ))}
        </div>
        </>
    );
}

export default ListaTareas;
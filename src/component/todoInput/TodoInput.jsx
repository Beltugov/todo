import React, {useContext, useState} from 'react';
import "./todoInput.scss"
import {ContextApp} from "../../App"

const TodoInput = () => {
    const {todo, dispatch} = useContext(ContextApp)
    function addTodo(e) {
        const value = e.target.value.trim()
        if (e.key === "Enter" && value !== "") {
            const newTodo = {
                id: Date.now(),
                text: e.target.value,
                completed: false,
                order: todo.length + 1,
            }
            dispatch({type: "addTodo", payload: newTodo})
            e.target.value = ""
        }
    }

    return (
        <input className={"todo-input"} type="text" placeholder="Create new todo..." onKeyPress={addTodo}/>
    );
};

export default TodoInput;
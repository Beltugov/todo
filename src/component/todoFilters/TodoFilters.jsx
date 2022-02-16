import React from 'react';
import "./todoFilters.scss"

const TodoFilters = (props) => {
    return (
        <div className="todo__filters">
            <label className={"todo__filters-item " + (props.radioValue === "All" ? "active" :"")} htmlFor="filterAll">
                <input name="filter" type="radio"
                       id="filterAll"
                       value={"All"}
                       checked={props.radioValue === "All"}
                       onChange={(e) => props.setRadioValue(e.target.value)}/>All</label>
            <label className={"todo__filters-item " + (props.radioValue === "Active" ? "active" :"")} htmlFor="filterActive">
                <input name="filter" type="radio"
                       id="filterActive"
                       value={"Active"}
                       checked={props.radioValue === "Active"}
                       onChange={(e) => props.setRadioValue(e.target.value)}/>Active</label>
            <label className={"todo__filters-item " + (props.radioValue === "Completed" ? "active" :"")} htmlFor="filterCompleted">
                <input name="filter" type="radio"
                       id="filterCompleted"
                       value={"Completed"}
                       checked={props.radioValue === "Completed"}
                       onChange={(e) => props.setRadioValue(e.target.value)}/>Completed</label>
        </div>
    );
};

export default TodoFilters;
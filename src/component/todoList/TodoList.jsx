import React, {useContext, useState} from 'react';
import "./TodoList.scss"
import {ContextApp} from "../../App";

const TodoList = (props) => {
   const {todo, dispatch} = useContext(ContextApp)
   const [currentCart, setCurrentCart] = useState(null)

   function changeCheck(e) {
      dispatch({
         type: "changeCheck", payload: e.target.id
      })
   }

   function handleDragStart(e, item) {
      setCurrentCart(item)
   }

   function handleDragEnd(e) {
      e.target.style.background = ""
   }

   function handleDragOver(e) {
      e.preventDefault()
   }

   function handleDrop(e, item) {
      e.preventDefault()
      dispatch({
         type: "changeOrder", payload: {
            item: item,
            current: currentCart,
         }
      })
      e.target.style.background = ""
   }


   return (
      <ul className="todo__list">
         {props.radioValue === "Completed" ?
            todo.sort((a, b) => a.order - b.order).map((item) => {
               return (
                  item.completed ? <li className="todo__list-item completed" key={item.id}
                                       draggable={true}
                                       onDragStart={e => handleDragStart(e, item)}
                                       onDragLeave={e => handleDragEnd(e)}
                                       onDragEnd={e => handleDragEnd(e)}
                                       onDragOver={e => handleDragOver(e)}
                                       onDrop={e => handleDrop(e, item)}>
                     <input type="checkbox" id={item.id}
                            defaultChecked={item.completed}
                            onChange={changeCheck}/><label
                     htmlFor={item.id}>
                     <div className={"checkbox " + (item.completed ? "checked" : "")}/>
                     {item.text}</label></li> : "")
            })
            : props.radioValue === "Active" ?
               todo.sort((a, b) => a.order - b.order).map((item) => {
                  return (
                     item.completed ? "" : <li className="todo__list-item" key={item.id}
                                               draggable={true}
                                               onDragStart={e => handleDragStart(e, item)}
                                               onDragLeave={e => handleDragEnd(e)}
                                               onDragEnd={e => handleDragEnd(e)}
                                               onDragOver={e => handleDragOver(e)}
                                               onDrop={e => handleDrop(e, item)}>
                        <input type="checkbox" id={item.id}
                               defaultChecked={item.completed}
                               onChange={changeCheck}/><label
                        htmlFor={item.id}>
                        <div className={"checkbox " + (item.completed ? "checked" : "")}/>
                        {item.text}</label></li>)
               })
               : todo.sort((a, b) => a.order - b.order).map((item) => {
                  return (
                     <li className={"todo__list-item " + (item.completed && "completed" )} key={item.id}
                         draggable={true}
                         onDragStart={e => handleDragStart(e, item)}
                         onDragLeave={e => handleDragEnd(e)}
                         onDragEnd={e => handleDragEnd(e)}
                         onDragOver={e => handleDragOver(e)}
                         onDrop={e => handleDrop(e, item)}>
                        <input type="checkbox" id={item.id}
                               defaultChecked={item.completed}
                               onChange={changeCheck}/><label
                        htmlFor={item.id}>
                        <div className={"checkbox " + (item.completed && "checked" )}/>
                        {item.text}</label></li>)
               })
         }
      </ul>
   );
};

export default TodoList;
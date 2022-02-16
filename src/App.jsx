import './App.scss';
import {createContext, useReducer, useState} from "react";
import ThemeButton from "./component/themeButton/ThemeButton";
import TodoInput from "./component/todoInput/TodoInput";
import TodoList from "./component/todoList/TodoList";
import TodoFilters from "./component/todoFilters/TodoFilters";

export const ContextApp = createContext()


function App() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
    const [radioValue, setRadioValue] = useState("All")
    const [todo, dispatch] = useReducer(reducer, [
        {
            id: Date.now(),
            text: "Do something...",
            completed: false,
            order: 1,
        },
    ])
    // счетчик оставшихся задач
    const counter = todo.filter(item => item.completed === false).length

    // сохранение выбранной темы
    localStorage.setItem("theme", theme)

    // reducer для ререндера при выборе задачи
    function reducer(state, action) {
        switch (action.type) {
            case 'addTodo':
                return [...state, action.payload];
            case 'changeCheck':
                return [...state.map((todo) => {
                    if (todo.id === Number(action.payload)) {
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        })
                    }
                    return todo
                })]
            case "clearCompleted":
                return [...state.filter(item => item.completed === false).map((todo, index) => {
                    return Object.assign({}, todo, {
                            order: index + 1
                        })
                })];
            case "changeOrder":
                return [...state.map((todo) => {
                    if (todo.id === action.payload.item.id) {
                        return Object.assign({}, todo, {
                            order: action.payload.current.order
                        })
                    }
                    if (todo.id === action.payload.current.id) {
                        return Object.assign({}, todo, {
                            order: action.payload.item.order
                        })
                    }
                    return todo
                })];
            default:
                return state;
        }
    }

    return (
        <ContextApp.Provider value={{dispatch, todo}}>
            <div className={"wrapper " + theme}>
                <div className="background"/>
                <div className="todo">
                    <div className="todo__header">
                        <h1 className="todo__header-title">TODO</h1>
                        <ThemeButton theme={theme} setTheme={setTheme}/>
                    </div>
                    <TodoInput/>
                    <div className="todo__actions">
                        <TodoList radioValue={radioValue}/>
                        <div className="todo__actions-buttons">
                            <div className="todo__actions-counter">Tasks left {counter}</div>
                            <TodoFilters radioValue={radioValue} setRadioValue={setRadioValue}/>
                            <button className="todo__actions-clear"
                                    onClick={() => dispatch({type: "clearCompleted"})}>Clear completed
                            </button>
                        </div>
                    </div>
                    <div className="todo-info">Drag and drop to render list</div>
                </div>
            </div>
        </ContextApp.Provider>
    );
}

export default App;

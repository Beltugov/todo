import React from 'react';
import "./ThemeButton.scss"
import sun from "../../assets/sun.png";
import moon from "../../assets/moon.png";

const ThemeButton = ({...props}) => {
    function switchTheme() {
        props.theme === "light" ? props.setTheme("dark") :  props.setTheme("light")
    }
    return (
        <button className="theme-button" type={"button"} onClick={switchTheme}>
            <img className="sun" src={sun} alt="sun" width={32}/>
            <img className="moon" src={moon} alt="moon" width={32}/>
        </button>
    );
};

export default ThemeButton;
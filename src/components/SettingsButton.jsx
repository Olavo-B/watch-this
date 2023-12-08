import React from "react";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./style/Button.css";

const SettingsButton = () => {
    return (
        <Link to="/profile">
        <button className="Button">
            <FiSettings size={25} color="#FFF" />
        </button>
        </Link>
    );
};

export default SettingsButton;
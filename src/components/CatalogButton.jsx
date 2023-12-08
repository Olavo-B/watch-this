import React from "react";
import { FiBook } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./style/Button.css";

const CatalogButton = () => {
    return (
        <Link to="/catalog">
        <button className="Button">
            <FiBook size={25} color="#FFF" />
        </button>
        </Link>
    );
};

export default CatalogButton;
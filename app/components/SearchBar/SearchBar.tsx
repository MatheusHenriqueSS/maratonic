import React from "react";
import style from "./SearchBar.module.css";

const SearchBar: React.FC = () => {
  return (
    <div className={style.input_wrapper}>
      <input type="text" />
      <button>Search</button>
    </div>
  );
};

export default SearchBar;

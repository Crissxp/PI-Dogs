import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterTemperament, getNameDog, queryName, resetPage, searchStatus } 
from "../../Redux/actions";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import OrderDogs from "../orderDogs/orderDogs";
import SelectData from "../selectData/selectData";
import FilterTemperaments from "../filterTemperaments/filterTemperaments";

export default function Search() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const statusSearch = useSelector(state => state.searchStatus)
  const history = useHistory()



  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    if (input.trim().length > 0) {
      dispatch(getNameDog(input));
      dispatch(resetPage());
      dispatch(filterTemperament(e.target.value))
      dispatch(searchStatus(true))
      setInput("")
    } else {
      e.preventDefault();
      alert("ingrese un nombre");
    }
  };
  function handleCleansearch(e){
    e.preventDefault()
    dispatch(searchStatus(false))
    dispatch(resetPage())
    history.push("/home")
  }

  return (
    <div className={style.back}>
      <div className={style.all}>
        {statusSearch  &&  <button className={style.xbtn} onClick={(e) => handleCleansearch(e)} > X</button>}
        <input
          className={style.search}
          onChange={(e) => handleChange(e)}
          type="text"
          value={input}
        />
        <Link to={`/home?name=${input}`}>
          {" "}
          <button className={style.btn} onClick={(e) => handleSubmit(e)}>
            Search
          </button>{" "}
        </Link>
        <div className={style.options}>
          <OrderDogs  className={style.spanSelec}/>
          <FilterTemperaments />
          <SelectData />
        </div>
      </div>
    </div>
  );
}

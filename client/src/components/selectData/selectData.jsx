import React from 'react'
import { useDispatch} from 'react-redux'
import {resetPage, searchStatus, selectData } from '../../Redux/actions'
import style from "./style.module.css"


export default function SelectData() {
const dispatch = useDispatch()




function handleChange(e){
  e.preventDefault()
  dispatch(selectData(e.target.value))
  dispatch(resetPage())
  dispatch(searchStatus (true))
}

  return (
    <div className={style.select}>
      <span className={style.spanSelect}>Dogs</span>
      <select onChange={(e) => handleChange(e)}  name="Select data" id="Select data">
        <option value="">Select</option>
        <option  value={"alldogs"}>All dogs</option>
        <option  value={"mydogs"}>My dogs</option>
        <option  value={"otherDogs"}>other dogs</option>
      </select>
    </div>
  )
}

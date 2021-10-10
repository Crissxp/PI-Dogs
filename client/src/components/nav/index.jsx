import React from 'react'
import { Link } from 'react-router-dom'
import { filterTemperament, getNameDog, getTemperament, orderDogs, resetPage, selectData } from '../../Redux/actions'
import style from "./style.module.css"
import { useDispatch } from 'react-redux'



export default function Nav() {


function handleGoHome(){
  dispatch(resetPage())
  dispatch(orderDogs(""))
  dispatch(getNameDog(""))
  dispatch(selectData("alldogs"))
  dispatch(filterTemperament("All"))
}

const dispatch = useDispatch()
  return (
    <div className={style.nav}>
      <div className={style.title}  >
       <Link className={style.dogapp} onClick={()=>handleGoHome()} to="/home"> <h1 > Dogs App</h1></Link>
        <div className={style.links} >
       <Link onClick={()=>handleGoHome()} to="/home"><p className={style.p}>Home</p></Link>
       <Link onClick={()=>dispatch(getTemperament())} to="/create"><p className={style.p}>Create</p></Link>
       <Link to="/AboutMe"><p className={style.p}>About me</p></Link>
        </div>
      </div>
    </div>
  )
}

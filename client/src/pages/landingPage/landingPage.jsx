import React from 'react'
import { Link } from "react-router-dom"
import style from "./style.module.css"





export default function LandingPage() {
  

  return (
    <div  className={style.background}>
      <div >
      <h1 className={style.text} >Welcome to Dogs App. A place full of puppies. Where you can search by breed and if you don't find the one you are looking for, you can create it yourself.</h1>
        <Link to="/home">
          <button className={style.btn}>Enter</button>
        </Link>
      </div> 
    </div>
  )
}

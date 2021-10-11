import React from 'react'
import Nav from '../../components/nav'
import style from "./style.module.css"

export default function AboutMe() {
  return (
    <div>
       <Nav />
       <div className={style.back}>
      <h1 className={style.card}>Hello my name is Cristhian Paez. I hope you are enjoying my individual educational project. The frontend of the project is based on JavaScripts, CSS, Reacts, Redux.In the backend Sequelize - Postgres. I am very happy with what I was able to do and the truth is that I put a lot of time and effort into it.Thank you for taking the time to look at my project.</h1>
    </div>
    </div>
     
  )
}

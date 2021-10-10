import { useSelector, useDispatch } from "react-redux"
import style  from "./style.module.css"
import Dog from "../card"
import { Link } from "react-router-dom"
import { getIdDog } from "../../Redux/actions"

 

export default function Cards({posts}) {
let result = useSelector(state => state.nameDog)
let dispatch = useDispatch()




if(result){
  return (
    
      
      <ul className={style.grid}>
      { 
        posts.map( (e,idx) => {

          return<li  key={idx} >
            <Link  onClick={()=>dispatch(getIdDog(e.id))} to={`/details/${e.id}`}>
                      <Dog  
                      name={e.name}
                      image={e.image}
                      weight={e.weight}
                      temperament={e.temperament}
                      id={e.id}
          />
          </Link>
          </li> 
          
        })
      }
      </ul>
  
    
    
  )
}
  return <h1>Sin resultados</h1>
  
}

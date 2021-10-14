import axios from "axios";
import { GET_DOGS, SET_LOADING, GET_ID_DOG, CLEAR_ID, PAGE_BACK, PAGE_NEXT, RESET_PAGE, GET_TEMPERAMENT, SELECT_DATA, ORDER_DOGS, FILTER_TEMPERAMENT, SEARCH_STATUS} from "./constantes";


export function setLoading(){
  return {
    type: SET_LOADING,
    payload: true
  }
};

export function getNameDog(name){
  if(!name) {
    name= ""
  }
    return function(dispatch){  
      return axios.get(`http://localhost:3001/dogs?name=${name}`)
        .then((dogName) => {
        dispatch({
          type: GET_DOGS,
          payload: dogName.data
        })
      }).catch((e) => {
        console.log(e)
        dispatch({
          type: GET_DOGS,
          payload: ""
        })
      } 
      )
    } 
}

export function getIdDog(id){
  return function(dispatch){
    return axios.get(`http://localhost:3001/dogs/${id}`)
    .then((dogId) => {
      dispatch({
        type: GET_ID_DOG,
        payload: dogId.data
      })
    })
  }
}

export function clearId(){
  return function(dispatch){
    dispatch({
      type: CLEAR_ID,
      payload: ""
    })
  }
}
export function backPages(n){
  return function(dispatch){
    if(n > 1)
    dispatch({
      type: PAGE_BACK,
      payload: -- n
    })
  }
}
export function nextPage(n, m){
  return function(dispatch){
    if(n < m){
      dispatch({
        type: PAGE_NEXT,
        payload: ++ n
      })
    }
    }
    
}
export function resetPage(){
  return function(dispatch){
    dispatch({
      type: RESET_PAGE,
      payload: 1
    })
  }
}
export function getTemperament(){
  return function(dispatch){
    return axios.get(`http://localhost:3001/temperaments`)
    .then((temperaments) => {
      
      dispatch({
        type: GET_TEMPERAMENT,
        payload: temperaments.data
      })
    })
  }
}

export function selectData(data) {
  return function(dispatch) {
    dispatch({
      type: SELECT_DATA,
      payload: data
    })
  }
}

export function orderDogs(order) {
  return function(dispatch) {
      dispatch({
        type: ORDER_DOGS,
        payload: order
      })
  }
}
export function filterTemperament(temperament) {
  return function(dispatch) {
    dispatch({
      type:FILTER_TEMPERAMENT,
      payload: temperament
    })
  }
}
export function searchStatus(status){
  return function(dispatch){
    dispatch({
      type:SEARCH_STATUS,
      payload: status
    })
  }
}





  
    


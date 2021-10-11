import { GET_DOGS , SET_LOADING,  GET_ID_DOG, CLEAR_ID, PAGE_BACK, PAGE_NEXT, RESET_PAGE, GET_TEMPERAMENT, SELECT_DATA, ORDER_DOGS, FILTER_TEMPERAMENT, SEARCH_STATUS} from "../actions/constantes"

const initialState = {
  nameDog: [],
  dogsId: {},
  pages: 1,
  setLoading: false,
  temperaments: [],
  order: "",
  data: "AZ",
  filterTemp: "",
  searchStatus: false,
}


 function rootReducer(state = initialState, action){
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        setLoading: true
      }
    case GET_DOGS:
      return{
        ...state,
        setLoading: false,
        nameDog: action.payload
        
      }
    
    case GET_ID_DOG:
      return {
        ...state,
      setLoading: false,
      dogsId: action.payload
    }
    case CLEAR_ID:
      return{
        ...state,
        dogsId: action.payload
      }
    case PAGE_BACK:
      return{
        ...state,
        pages: action.payload
      }
    case PAGE_NEXT:
      return{
        ...state,
        pages: action.payload
      }
    case RESET_PAGE:
      return{
        ...state,
        pages: action.payload
      }
    case GET_TEMPERAMENT:
      return{
        ...state,
        temperaments: action.payload
      }
    case SELECT_DATA:
      return{
        ...state,
        data: action.payload
      }
    case ORDER_DOGS:
      return{
        ...state,
        order: action.payload
      }
    case FILTER_TEMPERAMENT:
      return{
        ...state,
        filterTemp: action.payload
      } 
    case SEARCH_STATUS:
      return{
        ...state,
        searchStatus: action.payload
      } 
    
    
    
    default:
      return {...state}
  }
};

export default rootReducer;
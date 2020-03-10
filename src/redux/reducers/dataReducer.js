import {
  FETCH_RESTAURANTS,
  STOP_FETCHING,
  SET_RESTAURANTS,
  LIST_TOP_RESTAURANTS,
  LIST_COUNTRY_RESTAURANTS,
  FILTER_RESTAURANTS,
} from '../types';

const initialState = {
  restaurants: null,
  filteredRestaurants: null,
  topRestaurants: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESTAURANTS:
      return {
        ...state,
        loading: true
      };
    case STOP_FETCHING:
      return {
        ...state,
        loading: false
      };
    case SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
        filteredRestaurants: action.payload
      };
    case LIST_TOP_RESTAURANTS:
      let topArray = new Array(3000);
      state.restaurants.map(
        (restaurant, i) => {
          let data = restaurant['Top Ten'].split(" ");
          if(data[1] && data[1].slice(1) === '1'){
            topArray[data[0]] = i;
          }
        }
      );
      const resIndexArray = topArray.filter((index, i) => topArray[index] !== null);
      let topRes = [];
      resIndexArray.map(i => topRes.push(state.restaurants[i]));
      return {
        ...state,
        topRestaurants: topRes
      };
    case LIST_COUNTRY_RESTAURANTS:
      state.filteredRestaurants = state.restaurants;
      return {
        ...state,
        filteredRestaurants: action.payload === 'All' ? state.restaurants :
          (state.restaurants.filter(
            (restaurant) =>  restaurant.Country === action.payload
          ))
      };
    case FILTER_RESTAURANTS:
      state.filteredRestaurants = state.restaurants;
      const lowercasedFilter = action.payload.toLowerCase();
      return {
        ...state,
        filteredRestaurants: state.restaurants.filter(item => {
          return Object.keys(item).some(key =>
            typeof item[key] === "string" && item[key].toLowerCase().includes(lowercasedFilter)
          )
        })
      };
    default:
      return state;
  }
};
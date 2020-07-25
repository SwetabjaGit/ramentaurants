import {
  FETCH_RESTAURANTS,
  STOP_FETCHING,
  SET_RESTAURANTS,
  LIST_TOP_RESTAURANTS,
  LIST_COUNTRY_RESTAURANTS,
  FILTER_RESTAURANTS,
} from '../types';

const initialState = {
  restaurants: [],
  topRestaurants: [],
  loading: false,
  nextHref: null,
  hasMoreItems: true
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
      let restaurants = state.restaurants;
      action.payload.collection && action.payload.collection.map(article => {
        return restaurants.push(article);
      });
      let hasMoreItemss = true;
      if(action.payload.next_href) {
        hasMoreItemss = true;
      } else {
        hasMoreItemss = false;
      }
      return {
        ...state,
        restaurants: restaurants,
        nextHref: action.payload.next_href,
        hasMoreItems: hasMoreItemss
      };
    case LIST_TOP_RESTAURANTS:
      let topArray = new Array(3000);
      state.restaurants && state.restaurants.map(
        (restaurant, i) => {
          let data = restaurant['Top Ten'].split(" ");
          if(data[1] && data[1].slice(1) === '1'){
            topArray[data[0]] = i;
          }
          return restaurant;
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
      return {
        ...state,
        restaurants: action.payload === 'All' ? state.restaurants :
          (state.restaurants.filter(
            (restaurant) =>  restaurant.Country === action.payload
          ))
      };
    case FILTER_RESTAURANTS:
      const lowercasedFilter = action.payload.toLowerCase();
      return {
        ...state,
        restaurants: state.restaurants.filter(item => {
          return Object.keys(item).some(key =>
            typeof item[key] === "string" && item[key].toLowerCase().includes(lowercasedFilter)
          )
        })
      };
    default:
      return state;
  }
};
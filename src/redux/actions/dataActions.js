import {
  FETCH_RESTAURANTS,
  STOP_FETCHING,
  SET_RESTAURANTS,
  LIST_TOP_RESTAURANTS,
  LIST_COUNTRY_RESTAURANTS,
  FILTER_RESTAURANTS,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
} from '../types';
import axios from 'axios';

const fetchUrl = 'https://demo7326610.mockable.io/react/top-restaurants';

// Fetch All Restaurants
export const fetchRestaurants = () => (dispatch) => {
  dispatch({ type: FETCH_RESTAURANTS });
  dispatch({ type: LOADING_UI });
  axios.get(fetchUrl)
    .then(res => {
      //console.log(res.data);
      dispatch(setRestaurants(res.data));
      dispatch(listTopRestaurants());
      dispatch(clearErrors());
      dispatch({ type: STOP_FETCHING })
    })
    .catch(err => {
      console.error(err);
      dispatch(setRestaurants([]));
      dispatch(setErrors(err));
      dispatch({ type: STOP_FETCHING });
    });
};

// Set Restaurants
export const setRestaurants = (data) => (dispatch) => {
  dispatch({
    type: SET_RESTAURANTS,
    payload: data
  });
};

// List Top restaurants of every year
export const listTopRestaurants = () => (dispatch) => {
  dispatch({ type: LIST_TOP_RESTAURANTS });
};

// Filter restaurants based on country
export const listRestaurantsByCountry = (country) => (dispatch) => {
  dispatch({
    type: LIST_COUNTRY_RESTAURANTS,
    payload: country
  });
};

// Filter restaurants based on search keyword
export const filterRestaurantsByKeyword = (keyword) => (dispatch) => {
  dispatch({
    type: FILTER_RESTAURANTS,
    payload: keyword
  });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: STOP_LOADING_UI });
};

export const setErrors = (error) => (dispatch) => {
  dispatch({
    type: SET_ERRORS,
    payload: error.response.data
  });
  dispatch({ type: STOP_LOADING_UI });
};
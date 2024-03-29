
import { csrfFetch } from "./csrf";

const SET_REVIEWS = 'reviews/SET_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

export const setReviews = (reviews) => ({
    type: SET_REVIEWS,
    reviews,
  });

  export const addReview = (review) => ({
    type: ADD_REVIEW,
    review,
  });

  export const updateReview = (id, updatedReview) => ({
    type: UPDATE_REVIEW,
    payload: { updatedReview, id }
  });

  export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId,
  });

  export const getReviewsByProductId = (reviewId) => async (dispatch) => {
    try{
        const response = await csrfFetch(`/api/review/${reviewId}`)
        if(response.ok){
            const reviews = await response.json();
            dispatch(setReviews(reviews))
        }else {
            throw new Error('Failed to fetch reviews');
          }
    }catch(error){
        console.error('Error:',error)
    }
  }

export const createReview = (productId, reviewData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/product/${productId}/newreview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    if (response.ok) {
      const newReview = await response.json();
      dispatch(addReview(newReview));
      return newReview;
    } else {
      const errorData = await response.json();
      return { error: errorData };
    }
  } catch (error) {
    console.error('Error posting review:', error);
    return { error: error.message };
  }
};

export const editReview = (reviewId,reviewData)=>async(dispatch)=>{
  try{
    const response =await csrfFetch(`/api/review/update/${reviewId}`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(reviewData)
    });
    if(response.ok){
      const updatedReview = await response.json();

      dispatch({
        type: 'UPDATE_REVIEW',
        payload: { id: reviewId, updatedReview },
      });
      return updatedReview ;
    }else{

      throw new Error('Failed to update review');
    }

  }catch(error){
    console.error('Error edit a review:',error);
    // return {error:error.message}
    return  { ok: false, error: { message: 'Could not update the review. Please try again.' } };
  }
}
export const deleteReview = (id) => async (dispatch) => {

  const response = await fetch(`/api/review/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(removeReview(id));
  }
};
  const initialState = {reviews:{}}
  export default function reviewsReducer(state=initialState,action){
    switch (action.type){
        case SET_REVIEWS:
            return {...state, reviews:action.reviews}
        case ADD_REVIEW:
          return {
            ...state,
            reviews: Array.isArray(state.reviews) ? [...state.reviews, action.review] : [action.review]
          }
        case UPDATE_REVIEW: {
          return{...state,
            reviews: state.reviews.map((review) =>
                review.id === action.payload.id ? action.payload.updatedReview : review)}

          }
        case REMOVE_REVIEW:{
          const newState = { ...state };
          delete newState[action.reviewId];
          return newState
        }
        default:
            return state
    }
  }

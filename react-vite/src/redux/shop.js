import { csrfFetch } from './csrf';
const SET_SHOPS ='shops/SET_SHOPS';
const ADD_SHOP = 'shop/ADD_SHOP';
const UPDATE_SHOP = 'shop/UPDATE_SHOP';
const DELETE_SHOP = 'shop/DELETE_SHOP';
const SET_USER_SHOPS = 'shop/SET_USER_SHOPS'

export const setShops = (shops) => ({
    type:SET_SHOPS,
    shops
})
export const addShop = (shop) => ({
    type: ADD_SHOP,
    shop,
  });
export const updateShop = (shop) =>({
    type: UPDATE_SHOP,
    shop
})

export const deleteShop = (shopId) =>({
    type:DELETE_SHOP,
    shopId
})

export const setUserShops = (shops) => ({
    type: SET_USER_SHOPS,
    shops,
});

export const fetchShops = () => async(dispatch)=>{
    try{
        const response = await csrfFetch('/api/shop/',{
            method:'GET',

        })
        if(response.ok){
            const data = await response.json()
            dispatch(setShops(data.shops))
        }
    }catch(error){
        console.error('Error fetching shops:', error);
    }
}

export const createShop = (name) => async (dispatch) => {
    try {
      const response = await csrfFetch('/api/shop/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(name),
      });
      if (response.ok) {
        const {shop} = await response.json();
        dispatch(addShop(shop));
      }
    } catch (error) {
      console.error('Error creating shop:', error);
    }
  };

  export const modifyShop = (shopId, shopName) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/shop/update/${shopId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shopName),
      });
      if (response.ok) {
        const updatedShop = await response.json();
        dispatch(updateShop(updatedShop));

      }
    } catch (error) {
      console.error('Error updating shop:', error);
    }
  };

export const removeShop = (shopId) => async (dispatch) =>{
    try{
        const response = await csrfFetch(`/api/shop/${shopId}`,{
            method:'DELETE',
        })
        if(response.ok){
            dispatch(deleteShop(shopId))
        }
    }catch(error){
        console.error('Error deleting shop:',error)
    }
}

export const fetchShopsByUserId = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/shop/current', {
            method: 'GET',
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(setUserShops(data.shops));
        }
    } catch (error) {
        console.error('Error fetching shops by user ID:', error);
    }
};

const initialState = { shops: [],userShops:[] };

export default function shopReducer(state = initialState, action){
    switch(action.type){
        case SET_SHOPS:

            return {...state, shops:action.shops}
        case ADD_SHOP:
            return { ...state, shops: action.shop }
        case UPDATE_SHOP:
            return {...state, [action.shop.id] : action.shop }
        case DELETE_SHOP:{
                const newState = { ...state };
                delete newState[action.shopId];
                return newState;
            }
        case SET_USER_SHOPS:
            console.log('Updating userShops with', action.shops);
            return {...state,userShops:action.shops}
        default:
            return state;
    }
}


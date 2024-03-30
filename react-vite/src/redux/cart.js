import { csrfFetch } from "./csrf";

const SET_CART_ITEMS = 'reviews/SET_CART_ITEMS';
const ADD_CART_ITEM = 'reviews/ADD_CART_ITEM';
const UPDATE_CART_ITEM = 'reviews/UPDATE_CART_ITEM';
const REMOVE_CART_ITEM = 'reviews/REMOVE_CART_ITEM';
const CLEAR_CART = 'CLEAR_CART';
export const setCarts = (cartItems) => ({
    type: SET_CART_ITEMS,
    cartItems,
});

export const getCartItems = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/carts/current`)
        if (response.ok) {
            const cartItems = await response.json()
            dispatch(setCarts(cartItems))
        } else {
            throw new Error('Failed to fetch cart items')
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

export const addItem = (cartItem) => ({
    type: ADD_CART_ITEM,
    cartItem
})

export const addToCart = (productId, itemData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/product/${productId}/addcart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData),
        })
        if (response.ok) {
            const newCart = await response.json()
            dispatch(addItem(newCart))
            return newCart;
        } else {
            const errorData = await response.json();
            return { error: errorData };
        }

    } catch (error) {
        console.error('Error add to cart', error)
        return { error: error.message };
    }
}

export const editCartItem = (cartItem) => ({
    type: UPDATE_CART_ITEM,
    cartItem
})
export const editItem = (itemId, itemData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/carts/update/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(itemData)
        })
        if (response.ok) {
            const item = await response.json()
            dispatch(editCartItem(item))

            return item
        } else {
            const errorData = await response.json();
            console.error('Error updating cart item:', errorData);
            throw new Error('Failed to update item quantity')
        }
    } catch (error) {
        console.error('Error edit quantity for cart', error)
        return { error: error.message }
    }
}

export const removeItem = (productId) => ({
    type: REMOVE_CART_ITEM,
    productId
})

export const deleteItem = (cartItemId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/carts/delete/${cartItemId}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            dispatch(removeItem(cartItemId));
            dispatch(getCartItems());
        }

    } catch (error) {
        console.error('Error delete a item in cart', error)
    }
}
export const clearCart = () => ({
    type: CLEAR_CART,
});

const initialState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART_ITEMS:
            return {
                ...state, cartItems: action.cartItems
            }
        case ADD_CART_ITEM:
            return {
                ...state,
                cartItems: Array.isArray(state.cartItems) ? [...state.cartItems, action.cartItem] : [action.cartItem]
            };
        case UPDATE_CART_ITEM: {
            if (Array.isArray(state.cartItems)) {
                const updatedCartItems = state.cartItems.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
                return { ...state, cartItems: updatedCartItems };
            }
            return state;
        }
        case REMOVE_CART_ITEM: {
            const newState = { ...state };
            delete newState[action.productId];
            return newState
        }
        case CLEAR_CART:
            return {
                ...state,
                cartItems: [],
            };

        default:
            return state;
    }
};

export default cartReducer;

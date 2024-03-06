// export const SET_CART = 'SET_CART';
// export const ADD_ITEM = 'ADD_ITEM';
// export const REMOVE_ITEM = 'REMOVE_ITEM';
// export const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';
// export const CLEAR_CART = 'CLEAR_CART';


// export const addItem = (item) => ({
//     type: ADD_ITEM,
//     payload: item,
//   });

//   export const removeItem = (productId) => ({
//     type: REMOVE_ITEM,
//     payload: productId,
//   });

//   export const updateItemQuantity = (productId, quantity) => ({
//     type: UPDATE_ITEM_QUANTITY,
//     payload: { productId, quantity },
//   });

//   export const clearCart = () => ({
//     type: CLEAR_CART,
//   });

//   export const setCart = (cartItems) => ({
//     type: SET_CART,
//     payload: cartItems,
//   });

//   const initialState = {
//     cartItems: [], //[productId, quantity]
//   };

//   const cartReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case ADD_ITEM:
//         return {
//           ...state,
//           cartItems: [...state.cartItems, action.payload],
//         };
//       case REMOVE_ITEM:
//         return {
//           ...state,
//           cartItems: state.cartItems.filter(item => item.productId !== action.payload),
//         };
//       case UPDATE_ITEM_QUANTITY:
//         return {
//           ...state,
//           cartItems: state.cartItems.map(item =>
//             item.productId === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item
//           ),
//         };
//       case CLEAR_CART:
//         return {
//           ...state,
//           cartItems: [],
//         };
//       case SET_CART:
//         return {
//           ...state,
//           cartItems: action.payload,
//         };
//       default:
//         return state;
//     }
//   };

//   export default cartReducer;

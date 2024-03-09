import { csrfFetch } from './csrf';

const SET_PRODUCTS = 'products/SET_PRODUCTS';
const ADD_PRODUCT = 'product/ADD_PRODUCT';
const UPDATE_PRODUCT = 'product/UPDATE_PRODUCT';
const REMOVE_PRODUCT = 'product/REMOVE_PRODUCT';
const SET_PRODUCT_DETAIL = 'product/SET_PRODUCT_DETAIL';



export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

export const updateProduct = (id, updatedProduct) => ({
  type: UPDATE_PRODUCT,
  payload: { updatedProduct, id }
});

export const removeProduct = (productId) => ({
  type: REMOVE_PRODUCT,
  productId,
});

export const setProductDetail = (productDetail) => ({
  type: SET_PRODUCT_DETAIL,
  productDetail,
});

export const getProducts = () => async (dispatch) => {
  // console.log('getproducts action -->')
  const response = await csrfFetch('/api/product/');
  if (response.ok) {
    const data = await response.json();
    // console.log('Fetched products:', data);
    dispatch(setProducts(data.Products));
  } else {
    console.error('Filed to fetch products')
  }
}

export const createProduct = (formData) => async (dispatch) => {
  try{
    const response = await fetch('/api/product/newproduct', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // body: JSON.stringify(formData),
    body:formData
  });
  if (response.ok) {
    const newProduct = await response.json();
    dispatch(addProduct(newProduct.Product));
  }else {
    const errorData = await response.json();
    console.error('Failed to create a product:', errorData);
    throw new Error(errorData.message || "Failed to create product.");
  }
}catch(error){
  console.error('Error creating product:', error);
  throw error;
}
}

export const updateProductAction = (id, formData) => async (dispatch) => {
  try{
  // const productData = { product_name: product_name, price, desc: desc, image1, categorie: categorie };
  const response = await fetch(`/api/product/update/${id}`, {
    method: 'PUT',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // body: JSON.stringify(productData),
    body:formData
  });
  // console.log(response,'this is response')
  if (response.ok) {
    const updatedProduct = await response.json();
    dispatch(updateProduct(updatedProduct));
  } else {
    const errors = await response.json();
    console.error('Failed to update product:', errors);
    throw new Error(errors.errors);
  }}catch(error){
    console.error('Error updating product',error)
    throw error
  }
};

export const deleteProduct = (id) => async (dispatch) => {

  const response = await fetch(`/api/product/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(removeProduct(id));
  }
};

export const getProductDetail = (productId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/product/${productId}`);
    if (response.ok) {
      const productDetail = await response.json();
      dispatch(setProductDetail(productDetail));
    } else {
      throw new Error('Failed to fetch product details');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getProductsByShopId = (shopId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/shop/${shopId}/products`);
    if (response.ok) {
      const data = await response.json();
      dispatch(setProducts(data));
    } else {
      console.error('Failed to fetch products for shop', shopId);
    }
  } catch (error) {
    console.error('Error fetching products for shop:', shopId, error);
  }
};

const initialState = { products: [], productDetail: null }

export default function productsReducer(state = initialState, action) {
  // console.log('Current state:', state);
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.products };
    case SET_PRODUCT_DETAIL:
      return { ...state, productDetail: action.productDetail };
    case ADD_PRODUCT:
      return { ...state, [action.product.id]: action.product };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.products.map(product =>
          product.id === action.payload.id ? action.payload.updatedProduct : product
        ),
        productDetail: state.productDetail && state.productDetail.id === action.payload.id ? action.payload.updatedProduct : state.productDetail,
      };


    case REMOVE_PRODUCT: {
      const newState = { ...state };
      delete newState[action.productId];
      return newState

    }
    default:
      return state
  }
}


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItem, getCartItems, deleteItem } from "../../redux/cart";
import './Cart.css'
import { useNavigate } from "react-router-dom";
export default function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);
    const navigate=useNavigate()

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch]);
    const totalPrice = cartItems?.reduce((acc, item) => {
        if (item.product && typeof item.product.price === 'number') {
            return acc + item.product.price * item.quantity;
        }
        return acc;
    }, 0) || 0;

    const totalNumberOfProducts = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

    const handleQuantityChange = async (itemId, newQuantity) => {
        const itemData = { quantity: parseInt(newQuantity) };
        await dispatch(editItem(itemId, itemData));
        await dispatch(getCartItems());
    };

    const handleDeleteItem = (cartItemId) => {
        dispatch(deleteItem(cartItemId))
    }

    if (totalNumberOfProducts === 0) {
        return (
            <div className="cart-empty">
                <div className="empty-text">Your cart is empty.</div>
                <a href="/">Discover something unique to fill it up.</a>

            </div>
        );
    }
    const handleShopNameClick = (shopId) => {
        navigate(`/${shopId}/products`);
      };
    return (
        <div >
            <div className="cart-title">{totalNumberOfProducts} items in your cart</div>
            <div className="cart-container">
                <div id="product-details">
                    {console.log(cartItems)}

                    {cartItems?.map((item) => (
                        <>

                            <div key={item.id} className="cart-item">

                                <div className="cart-item-left">

                                    <div className='name' onClick={() => handleShopNameClick(item.product.shop_id)}>{item.product && item.product.shop ? item.product.shop.shopname : 'No shop info'}</div>
                                    <img onClick={()=>navigate(`/product/${item.product_id}`)} src={item.product ? item.product.image1 : ''} alt={item.product ? item.product.product_name : 'Product'} style={{ width: '200px', height: '200px' }} />

                                </div>
                                <div className="cart-item-right">
                                    <div className="cart-product-name" onClick={()=>navigate(`/product/${item.product_id}`)}>{item.product ? item.product.product_name : 'Product Name'}</div>
                                    <div className="quantitly-remove">
                                    <div className="quantity">
                                        <select
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            className="select-quantity"
                                        >
                                            {[...Array(20).keys()].map(n => (
                                                <option key={n + 1} value={n + 1}>
                                                    {n + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button className='remove-button' onClick={() => handleDeleteItem(item.id)}>Remove</button>
                                    </div>
                                </div>
                                <div className="cart-item-price">
                                    <i className="fas fa-dollar-sign"></i>

                                    <div>{item.product ? item.product.price : 0}</div>
                                </div>

                            </div>
                        </>
                    ))}

                </div>
                <div className="cart-summary">
                    <h2>Cart Summary</h2>
                    <div className="cart-summary-shipping">
                        <div>Shipping</div>
                        <div>Free</div>
                    </div>
                    <div className="cart-summary-total">
                        <div>Total({cartItems?.length})</div>
                        <div className="dollar">
                            <i className="fas fa-dollar-sign"></i>
                            <div className="totalprice">{totalPrice.toFixed(2)}</div>
                        </div>
                    </div>

                    <button className='add-to-cart-btn' onClick={() => alert('feature coming soon')}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
}

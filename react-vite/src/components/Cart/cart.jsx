
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItem, getCartItems, deleteItem } from "../../redux/cart";
import './Cart.css'
export default function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);
    console.log(cartItems.Cart, 'this is cart items ===>');

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch]);
    const totalPrice = cartItems.Cart?.reduce((acc, item) => acc + item.product.price * item.quantity, 0) || 0;

    const handleQuantityChange = (itemId, newQuantity) => {
        const itemData = { quantity: parseInt(newQuantity) };
        dispatch(editItem(itemId, itemData));
        dispatch(getCartItems());
    };

    const handleDeleteItem=(cartItemId)=>{
        dispatch(deleteItem(cartItemId))
    }
    return (
        <div >
            <div className="cart-title">{cartItems.Cart?.length} items in your cart</div>
            <div className="cart-container">
                <div id="product-details">
                    {cartItems.Cart?.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-left">
                                <div>{item.product.shop.shopname}</div>
                                <img src={item.product.image1} alt={item.product.product_name} style={{ width: '100px', height: '100px' }} />
                            </div>
                            <div className="cart-item-right">
                                <div className="cart-product-name">{item.product.product_name}</div>
                                {/* <div>{item.quantity}</div> */}
                                {/* <div className="quantitly-remove"> */}
                                <div className="quantity">

                                    <select
                                        value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                    >
                                        {[...Array(20).keys()].map(n => (
                                            <option key={n + 1} value={n + 1}>
                                                {n + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button className='remove-button' onClick={()=>handleDeleteItem(item.id)}>Remove</button>
                                {/* </div> */}
                            </div>
                            <div className="cart-item-price">
                                <i className="fas fa-dollar-sign"></i>
                                <div>{item.product.price}</div>
                            </div>

                        </div>
                    ))}

                </div>
                <div className="cart-summary">
                    <h2>Cart Summary</h2>
                    <div className="cart-summary-shipping">
                        <div>Shipping</div>
                        <div>Free</div>
                    </div>
                    <div className="cart-summary-total">
                        <div>Total({cartItems.Cart?.length})</div>
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

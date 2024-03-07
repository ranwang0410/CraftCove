import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/product';
import { useNavigate } from "react-router-dom";
import './getAllProduct.css'


export default function GetAllProduct() {

    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products) || [];

    const navigate = useNavigate();

    useEffect(() => {

        dispatch(getProducts())
    }, [dispatch])

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (!Array.isArray(products) || products.length === 0) {
        return <div>No such product.</div>;
    }

    return (
        <div className="landing-page">
            <div className="product-list">


                {products?.map(product => (
                    <div key={product.id} className="product-item" onClick={() => handleProductClick(product.id)}>
                        <img src={product.image1 ? product.image1 : null} alt={product.product_name} />
                        <h3>{product.product_name}</h3> * <h4> {product.shop ? product.shop.shopname : 'No shop info'}</h4>
                        <p style={{ fontWeight: 'bold' }}>${product.price}</p>

                    </div>
                ))}


            </div>
        </div>
    )
}

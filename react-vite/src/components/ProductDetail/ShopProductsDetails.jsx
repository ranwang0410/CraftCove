import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsByShopId } from "../../redux/product";
import { useDispatch, useSelector } from "react-redux";
import './ShopProductDetails.css'

export default function ShopProductDetails() {
    const { shopId } = useParams();
    const products = useSelector(state => state.product.products.products)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    let shopname = 'Loading shop...';
    useEffect(() => {
        if (shopId) {
            dispatch(getProductsByShopId(shopId))
        }
    }, [shopId, dispatch])

    if (products && products.length > 0) {
        shopname = products[0].shop.shopname;
    }

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };
    return (
        <div>
            <div className="shop1">{shopname}</div>
            <div className="product-shopid">
                {products ? (

                    products?.map((product) => (
                        <div key={product.id} className="product-item-shopid">

                            <div className="product-spec" onClick={() => handleProductClick(product.id)}>
                                <img src={product.image1 ? product.image1 : undefined} alt={product.product_name} />
                                <h3>{product.product_name}</h3>
                                <p style={{ fontWeight: 'bold' }}>${product.price}</p>
                            </div>

                        </div>
                    ))

                ) : (
                    <p>No products found for this shop.</p>
                )}
            </div>
        </div>
    )
}

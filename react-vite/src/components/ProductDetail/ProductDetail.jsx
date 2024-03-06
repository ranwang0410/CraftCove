import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getProductDetail } from "../../redux/product";
import './ProductDetail.css'
export default function ProductDetail() {

    const { productId } = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.product.productDetail);
    const [selectedImage, setSelectedImage] = useState('');
    useEffect(() => {
        dispatch(getProductDetail(productId))
    }, [dispatch, productId])

    useEffect(() => {
        if (productDetails && productDetails.image1) {
            setSelectedImage(productDetails.image1);
        }
    }, [productDetails]);

    if (!productDetails) {
        return <div>Loading product details...</div>;
    }

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };
    return (
        <div className="product-detail-container">

            <div className="images-sidebar">
                {productDetails.image2 && <img src={productDetails.image2} onClick={() => handleImageClick(productDetails.image2)} alt={productDetails.product_name} />}
                {productDetails.image3 && <img src={productDetails.image3} onClick={() => handleImageClick(productDetails.image3)} alt={productDetails.product_name} />}
                {productDetails.image4 && <img src={productDetails.image4} onClick={() => handleImageClick(productDetails.image4)} alt={productDetails.product_name} />}
                {productDetails.image5 && <img src={productDetails.image5} onClick={() => handleImageClick(productDetails.image5)} alt={productDetails.product_name} />}
                {productDetails.image6 && <img src={productDetails.image6} onClick={() => handleImageClick(productDetails.image6)} alt={productDetails.product_name} />}
                {productDetails.image7 && <img src={productDetails.image7} onClick={() => handleImageClick(productDetails.image7)} alt={productDetails.product_name} />}
                {productDetails.image8 && <img src={productDetails.image8} onClick={() => handleImageClick(productDetails.image8)} alt={productDetails.product_name} />}
                {productDetails.image9 && <img src={productDetails.image9} onClick={() => handleImageClick(productDetails.image9)} alt={productDetails.product_name} />}
            </div>
            <div className="main-image-container">
                <span><i className='fas fa-angle-left'></i></span>
                <img src={selectedImage ? selectedImage : null} alt={productDetails.product_name} />
                <span><i className='fas fa-angle-right'></i></span>
            </div>

            <div className="product-info">
                <h1>${productDetails.price}</h1>
                <h2>{productDetails.product_name}</h2>
                <h2>{productDetails.shop ? productDetails.shop.shopname : 'No shop info'}</h2>
                <button className="add-to-cart-btn"  onClick={() => alert('Feature coming soon')}>Add to cart</button>
            </div>
        </div>
    )
}

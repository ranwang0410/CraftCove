import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetail } from "../../redux/product";
import './ProductDetail.css'
import { getReviewsByProductId, createReview, deleteReview } from "../../redux/review";
import { useModal } from '../../context/Modal'
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";
import ReviewUpdateFormModal from "../ReviewFormModal/ReviewUpdateFormModal";
import DeleteReviewModal from '../ReviewFormModal/DeleteReviewModal'
import { addToCart } from "../../redux/cart";

const StarRatingDisplay = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="star-rating">
            {'★'.repeat(fullStars)}
            {halfStar ? '½' : ''}
            {'☆'.repeat(emptyStars)}
        </div>
    );
};


export default function ProductDetail() {
    const { setModalContent, closeModal } = useModal();
    const { productId } = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.product.productDetail);
    console.log(productDetails, 'thisi s product details===>')
    const [selectedImage, setSelectedImage] = useState('');
    const reviews = useSelector(state => state.review.reviews)

    const [hasUserPostedReview, setHasUserPostedReview] = useState(false);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const sessionUser = useSelector(state => state.session.user);
    const isLoggedIn = Boolean(sessionUser);
    const isOwner = sessionUser && sessionUser.id === productDetails?.shop?.user_id;
    // console.log(sessionUser,'session user')
    const [sortOption, setSortOption] = useState('default');

    const navigate = useNavigate()

    const [showAddedToCartModal, setShowAddedToCartModal] = useState(false);

    useEffect(() => {
        dispatch(getProductDetail(productId));
        dispatch(getReviewsByProductId(productId))
    }, [dispatch, productId])

    useEffect(() => {
        if (reviews && sessionUser) {

            const userReview = reviews?.reviews?.find(review => review.user_id === sessionUser.id);
            setHasUserPostedReview(Boolean(userReview));
        }
    }, [reviews, sessionUser]);
    useEffect(() => {
        if (productDetails && productDetails.image1) {
            setSelectedImage(productDetails.image1);
        }
    }, [productDetails]);

    useEffect(() => {
        if (Array.isArray(reviews.reviews)) {
            const total = reviews.reviews.length;
            const average = reviews.reviews.reduce((acc, curr) => acc + curr.rating, 0) / total;

            setTotalReviews(total);
            setAverageRating(average.toFixed(1));
        }
    }, [reviews.reviews]);
    if (!productDetails) {
        return <div>Loading product details...</div>;
    }

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const formatDate = (dateString) => {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleNewReview = async (reviewData) => {
        await dispatch(createReview(productId, reviewData));
        setHasUserPostedReview(true)
        closeModal();
        dispatch(getReviewsByProductId(productId))
    };


    const openReviewForm = () => {
        if (productId) {
            setModalContent(
                <ReviewFormModal
                    productId={productId}
                    onReviewSubmit={handleNewReview}
                />
            );
        }
    };

    const openUpdateReviewForm = (review) => {
        setModalContent(
            <ReviewUpdateFormModal
                review={review}

            />
        )
    }

    const handleDelete = async (reviewId) => {
        await dispatch(deleteReview(reviewId));
        closeModal()
        dispatch(getReviewsByProductId(productId))
    };
    const openDeleteModal = (reviewId) => {

        setModalContent(
            <DeleteReviewModal
                onConfirm={() => handleDelete(reviewId)}
                onCancel={closeModal}
            />
        );
    };

    const sortedReviews = () => {
        if (!reviews) return [];
        return [...reviews.reviews].sort((a, b) => {
            switch (sortOption) {
                case 'mostRecent':
                    return new Date(b.created_at) - new Date(a.created_at);
                case 'highestRating':
                    return b.rating - a.rating;
                case 'lowestRating':
                    return a.rating - b.rating;
                default:
                    return 0;
            }
        });
    };

    const handleAddToCart = async () => {
        const itemData = {
            productId: productDetails.id,
            quantity: 1
        };
        await dispatch(addToCart(productId, itemData));
        setShowAddedToCartModal(true);
    };
    const closeModalHandler = () => {
        setShowAddedToCartModal(false);
    };
    const addedToCartModalContent = (
        <div className="modal-overlay" onClick={closeModalHandler}>
            <div className="added-to-cart-modal">
                {selectedImage && <img src={selectedImage} alt="Product" style={{ maxWidth: '100px', marginBottom: '10px' }} />}
                <div className="cart-text">Item added to cart.</div>
                <button className='viewcart-btn' onClick={() => navigate('/carts')}>View Cart & Checkout</button>
            </div>
        </div>
    )
    return (
        <>
            <div className="product-detail-container">
                <div className="image-container">
                    <div className="images-sidebar">
                        {productDetails.image1 && <img src={productDetails.image1} onClick={() => handleImageClick(productDetails.image1)} alt={productDetails.product_name} />}
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

                        <img src={selectedImage ? selectedImage : null} alt={productDetails.product_name} />

                    </div>

                </div>
                <div className="product-info">
                    <h1><i className="fa-solid fa-dollar-sign" />{productDetails.price}</h1>
                    <h2>{productDetails.product_name}</h2>
                    <h2>{productDetails.shop ? productDetails.shop.shopname : 'No shop info'}</h2>
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to cart</button>
                </div>
                {showAddedToCartModal && addedToCartModalContent}
            </div>

            <div className="reviews-container">

                {Array.isArray(reviews.reviews) && reviews.reviews.length > 0 ? (
                    <>
                        <div className="review-header">
                            <div>{totalReviews} Reviews</div>
                            <div className="average-rating"><StarRatingDisplay rating={Number(averageRating)} /></div></div>

                        <div className="sort-dropdown">
                            <label htmlFor="sortReviews">Sort by: </label>
                            <select id="sortReviews" value={sortOption} onChange={e => setSortOption(e.target.value)}>
                                <option className='option' value="default">Default</option>
                                <option value="mostRecent">Most Recent</option>
                                <option value="highestRating">Highest Rating</option>
                                <option value="lowestRating">Lowest Rating</option>
                            </select>
                        </div>
                        {sortedReviews()
                            // .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                            .map((review) => (
                                <div key={review.id} className="review">
                                    <div>Rating: {review.rating}</div>
                                    <StarRatingDisplay rating={review.rating} />
                                    <div>{review.comment}</div>
                                    <div>{review.user.username}</div>
                                    <div>{formatDate(review.created_at)}</div>
                                    {sessionUser && sessionUser.id === review.user.id && (
                                        <button onClick={() => openUpdateReviewForm(review)}>Update</button>
                                    )}
                                    {sessionUser && sessionUser.id === review.user.id && (
                                        <button className='deleteshop-button' onClick={() => openDeleteModal(review.id)}>Delete</button>

                                    )}


                                </div>
                            ))}
                    </>
                ) : (
                    <p>No reviews yet.</p>
                )}

            </div>

            {isLoggedIn && !isOwner && !hasUserPostedReview && (
                <div className="post-review">
                    <button className='post-review-button' onClick={openReviewForm}>Post Your Review</button>
                </div>
            )}
        </>
    )
}

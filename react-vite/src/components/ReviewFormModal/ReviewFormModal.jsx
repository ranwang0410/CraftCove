import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {useModal} from '../../context/Modal'
import { createReview } from '../../redux/review';
import StarRating from './StarRating';
import './ReviewFormModal.css'

export default function ReviewFormModal({ productId, onReviewSubmit }) {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    useEffect(() => {
        setRating(0);
        setComment('');
        setErrors({});
    }, [productId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (comment.length > 300) {
            setErrors({ message: "Review must be 300 characters or less." });
            return;
        }
        if (comment.length < 10) {
            setErrors({ message: "Review must be more than 10 characters." });
            return;
        }
        if (rating === 0) {
            setErrors({ message: "Review rating cannot be 0." });
            return;
        }
        try {
        const reviewData = { comment, rating, productId: parseInt(productId, 10) };
        // console.log("Submitting review:", reviewData);
        const response = await dispatch(createReview(productId,reviewData));

        if (!response.error){
            onReviewSubmit(response);
            closeModal()
            setRating(0);
            setComment('');
        } else if(response.status === 500) {
            const errorResponse = await response.json();
            throw new Error({message:errorResponse.message || 'User already has a review for this product'});
        }}catch(error){
            setErrors({ message: 'An unexpected error occurred.'});
        }

    }
    return (
        <div className='reviews-form'>
            <div className='review-title'>Create Review</div>
            {errors.message && <div style={{ color: 'red' }}>{errors.message}</div>}
            <form onSubmit={handleSubmit} className="review-form" noValidate>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Leave your review here..."
                    required
                />
                <div className="star-rating">
                    <StarRating setRating={setRating} />

                    <div className='stars'> Stars</div>
                </div>
                <button className="submit-review-button"
                    type="submit"
                    // disabled={rating === 0}
                    // onClick={() => console.log("Button clicked")}
                >Submit Your Review
                </button>
            </form>
        </div>
    )
}

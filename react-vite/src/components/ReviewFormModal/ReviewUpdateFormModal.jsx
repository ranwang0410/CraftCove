import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReview, getReviewsByProductId } from '../../redux/review';
import StarRating from './StarRating';

import { useModal } from '../../context/Modal'
const ReviewUpdateFormModal = ({ review}) => {
    // console.log('update form')
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // console.log(review, 'review===>')
    const [rating, setRating] = useState(review.rating);
    const [comment, setComment] = useState(review.comment);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        setRating(rating);
        setComment(comment);
        setErrors({});
    }, [review.product_id])

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
        const updatedReviewData = { comment, rating };
        // console.log('hello',updatedReviewData,review.id)
        const response = await dispatch(editReview(review.id, updatedReviewData));
        // console.log('heresss',response)
        // console.log('thisi si response===>',response.product_id)

        if (response) {

            // console.log('product id===>',response.product_id)
            dispatch(getReviewsByProductId(response.product_id));
            closeModal();

        } else {
            setErrors('Could not update the review.' );
        }

    };

    return (
        <div className='review-update-form'>
            <div className='review-title'>Update Review</div>
            {errors.message && <div style={{ color: 'red' }}>{errors.message}</div>}
            <form onSubmit={handleSubmit} className="review-form">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Update your review here..."
                    required
                />
                <div className="star-rating">
                    <StarRating rating={rating} setRating={setRating} />
                    <div className='stars'> Stars</div>
                </div>
                <button className="submit-review-button"

                onClick={() => console.log('Button clicked')}
                    type="submit"
                    // disabled={comment.length < 10 || rating === 0}
                >Update Review
                </button>

            </form>
        </div>
    );
};

export default ReviewUpdateFormModal;

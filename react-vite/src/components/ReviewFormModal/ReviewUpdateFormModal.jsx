import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReview } from '../../redux/review';
import StarRating from './StarRating';

import { useModal } from '../../context/Modal'
const ReviewUpdateFormModal = ({ review, onReviewUpdate }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    console.log(review, 'review===>')
    const [rating, setRating] = useState(review.rating);
    const [comment, setComment] = useState(review.comment);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        // console.log('hello')
        try {
            const updatedReviewData = { comment, rating }
            // console.log(updatedReviewData, 'this is update review----')

            const response = await dispatch(editReview(review.id, updatedReviewData));
            // console.log('this is response====>', response)
            if (response.ok) {
                onReviewUpdate();
                closeModal();
            } else {
                throw new Error('Could not update the review');
            }
        } catch (error) {
            setErrors({ message: 'Could not update the review catch' });
        }
    };

    return (
        <div className='review-update-form'>
            <div className='review-title'>Update Review</div>
            {errors.message && <p className="error-message">{errors.message}</p>}
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
                    type="submit"
                    disabled={comment.length < 10 || rating === 0}
                >Update Review
                </button>
            </form>
        </div>
    );
};

export default ReviewUpdateFormModal;

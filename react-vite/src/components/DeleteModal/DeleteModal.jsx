
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../redux/product';
import './DeleteModal.css'

export default function DeleteModal({ productId, onCancel, afterDelete }) {

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productId) {
            console.error('No product ID provided for deletion');
            return;
        }

        await dispatch(deleteProduct(productId));
        onCancel()
        afterDelete()

    }
    return (
        <div className="delete-confirmation-modal-product">
            <div className='delete-product-title'>You are about to delete 1 listing</div>
            <hr />
            <div className='delete-product-text'>Keep in mind that deleted listings can’t be retrieved. If you’d like to keep a listing from being viewed publicly without deleting it permanently, please deactivate the listing instead. This will allow you to edit or reactivate it at any time.</div>
            <hr />
            <div className='delete-flex'>

                <div className='cancel'>
                    <button onClick={onCancel}>Cancel</button>
                </div>
                <br></br>

                <div className='delete'>
                    <button onClick={handleSubmit}>Delete</button>
                </div>

            </div>
        </div>
    )
}



import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../redux/product';


export default function DeleteModal({ productId,onCancel,afterDelete}) {
    // console.log('Deleting product with ID:', productId);

    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
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
        <div className="delete-confirmation-modal">
          <div>You are about to delete 1 listing</div>
          <div>Keep in mind that deleted listings can’t be retrieved. If you’d like to keep a listing from being viewed publicly without deleting it permanently, please deactivate the listing instead. This will allow you to edit or reactivate it at any time.</div>
          <br></br>
          <div className='yes'>
          <button onClick={handleSubmit}>Delete</button>
          </div>
          <br></br>
          <div className='no'>
            <button onClick={onCancel}>Cancel</button>
    </div>
        </div>
      )
  }


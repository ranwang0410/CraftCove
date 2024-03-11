import './DeleteShopModal.css'
export default function DeleteShopModal({ onConfirm, onCancel }) {

    return (
        <div className="delete-confirmation-modal">
            <div className='delete-shop-title'>Confirm Delete</div>
            <hr />
            <div className='delete-shop-text'>Are you sure you want to remove this shop from the listings?</div>
            <hr />
            <div className='delete-flex-shop'>
                <div className='cancel-shop'><button onClick={onCancel}>Cancel</button></div>
                <div className='delete-shop'><button onClick={onConfirm}>Delete</button></div>
            </div>
        </div>

    )
}

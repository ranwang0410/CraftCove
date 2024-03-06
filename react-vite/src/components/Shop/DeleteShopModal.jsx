import './DeleteShopModal.css'
export default function DeleteShopModal({ onConfirm, onCancel }) {

    return(
        <div className="delete-confirmation-modal">
            <div className='delete-shop-title'>Confirm Delete</div>
            <div className='delete-shop-text'>Are you sure you want to remove this shop from the listings?</div>
            <br></br>
            <div className='yes'><button onClick={onConfirm}>Yes</button></div>
            <br></br>
            <div className='no'><button onClick={onCancel}>No</button></div>
        </div>
    )
}

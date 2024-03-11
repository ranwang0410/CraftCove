import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchShopsByUserId,createShop } from "../../redux/shop";
import { useModal } from "../../context/Modal";
import './CreateShopModal.css'
function CreateShopModal(){
    const dispatch = useDispatch()
    const [shopName,setShopName] = useState('')
    const [error,setError] = useState('')
    const { closeModal } = useModal();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if (!shopName.trim()) {
            setError('Please enter a shop name');
            return;
        }

        try{
            await dispatch(createShop({shopname:shopName}))
            closeModal();
            await dispatch(fetchShopsByUserId())

        }catch(error){
            console.error('Failed to create a shop', error);
            setError(error.message);
            setError('This shop name already exists.')
        }
        setShopName('')
    }

    return (
        <div className="modal">
            <div id='modalTitle'>Create Shop</div>
            <form onSubmit={handleSubmit} className="update-shop-form" noValidate>
                <label htmlFor="shopName">Shop Name:</label>
                <input
                    id="shopName"
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    required
                />
              <div id="modalFooter">
              <div className='btnText' onClick={closeModal}>Cancel</div>
                <input type="submit" value='Create'/>


                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
        </div>
    )
}

export default CreateShopModal;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopsByUserId, modifyShop } from '../../redux/shop';
import { useModal } from "../../context/Modal";
import './UpdateShop.css';

export default function UpdateShop({ shopId, onSuccess }) {
    const [shopName, setShopName] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const userShops = useSelector(state => state.shop.userShops);

    useEffect(() => {
        const shop = userShops.find(shop => shop.id === shopId);

        if (shop) {
            setShopName(shop.shopname);
        }
    }, [userShops, shopId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!shopName.trim()) {
            setError('Please enter a shop name');
            return;
        }

        dispatch(modifyShop(shopId, { shopname: shopName.trim() }))
            .then(() => {
                closeModal();
                dispatch(fetchShopsByUserId());
                if (onSuccess) {
                    onSuccess();
                }
            })
            .catch((error) => {
                console.error('Error updating shop:', error);
                setError('This shop name already exists.');
            });
    };

    return (
        <div className="modal">
            <div id='modalTitle'>Update Shop</div>
            <form onSubmit={handleSubmit} className="update-shop-form" noValidate>
                <label htmlFor="shopName">New Shop Name:</label>
                <input
                    id="shopName"
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    required
                />

                <div id="modalFooter">
                    <div className='btnText' onClick={closeModal}>Cancel</div>
                    <input type="submit" value='Update'/>
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
        </div>
    );
}

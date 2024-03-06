import { useState } from "react";
import { useDispatch } from 'react-redux';
import { modifyShop } from '../../redux/shop';
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateShop() {
    const [shopName, setShopName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shopId } = useParams();
    const [error, setError] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();


        dispatch(modifyShop(shopId, { shopname: shopName }))
            .then(() => {
                navigate('/store')
            })
            .catch((error) => {
                console.error('Error updating shop:', error);
                setError('The shop name is existed')
            });
    };
    return (
        <div>
            <h2>Update Shop Name</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="shopName">New Shop Name:</label>
                <input
                    id="shopName"
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    required
                />

                <button type="submit">Update Shop</button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
        </div>
    )
}

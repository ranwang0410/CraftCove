import {  useState } from "react";
import { useDispatch } from 'react-redux';
import { fetchShopsByUserId,createShop} from '../../redux/shop';
import { useNavigate } from "react-router-dom";

export default function CreateShop(){
    const dispatch = useDispatch()
    const [shopName, setShopName] = useState('')
    const navigate = useNavigate();
    const [error,setError] = useState('')
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            await dispatch(createShop({ shopname: shopName }));
            await dispatch(fetchShopsByUserId());

            navigate('/store');
        } catch (error) {
            console.error('Failed to create a shop', error);
            setError(error.message);
            setError('This shop name already exists.')
        }
        setShopName('')
    }

    return (
        <div>
            <h2>Create Shop</h2>
            <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="shopName">Shop Name:</label>
                <input
                    id="shopName"
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    required
                />
                <button type="submit" >Create Shop</button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
        </div>
    )
}

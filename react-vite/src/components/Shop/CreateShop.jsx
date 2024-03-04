import {  useState } from "react";
import { useDispatch } from 'react-redux';
import { fetchShopsByUserId,createShop} from '../../redux/shop';

export default function CreateShop(){
    const dispatch = useDispatch()
    const [shopName, setShopName] = useState('')

    // const [errors,setErrors] = useState({})//add error message later
    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch(createShop({shopname:shopName}))
        .then(()=>{
            dispatch(fetchShopsByUserId());
        })
        .catch((error)=>{
            console.error('Failed to create a shop',error)
        })
        setShopName('')
    }

    return (
        <div>
            <h2>Create your first Shop</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="shopName">Shop Name:</label>
                <input
                    id="shopName"
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    required
                />
                <button type="submit" >Create Shop</button>
            </form>
        </div>
    )
}

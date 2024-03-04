import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchShopsByUserId,removeShop} from '../../redux/shop';
import { useNavigate } from "react-router-dom";
import CreateShop from "./CreateShop";

export default function UserShops(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const userShops = useSelector((state) => state.shop.userShops);
    useEffect(() => {
        if (sessionUser) {
        dispatch(fetchShopsByUserId());
        }
    }, [dispatch,sessionUser]);

    const handleDelete = (shopId) => {
        dispatch(removeShop(shopId))
            .then(() => {
                dispatch(fetchShopsByUserId());
            });
    };

    if(!sessionUser){
        return null
    }
    if(userShops.length === 0){
        return <CreateShop/>
    }

    return (
        <div>
            <h2>My Shops</h2>
            <ul>
                {userShops.map((shop) => (
                    <li key={shop.id}>
                        Shop Name: {shop.shopname}
                        <button onClick={() => navigate(`/shop/update/${shop.id}`)}>Update</button>
                        <button onClick={() => handleDelete(shop.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

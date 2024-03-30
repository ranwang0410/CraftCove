import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopsByUserId, removeShop } from '../../redux/shop';
import { useNavigate } from "react-router-dom";
import './UserShop.css';
import DeleteShopModal from './DeleteShopModal'
import { useModal } from "../../context/Modal";
import CreateShopModal from "./CreateShopModal";
import UpdateShop from "./UpdateShop";

export default function UserShops() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const userShops = useSelector((state) => state.shop.userShops);

    const { closeModal, setModalContent } = useModal()

    useEffect(() => {
        if (sessionUser) {
            dispatch(fetchShopsByUserId());
        }
    }, [dispatch, sessionUser]);

    const handleDelete = async (shopId) => {
        await dispatch(removeShop(shopId));
        closeModal()
        dispatch(fetchShopsByUserId())
    };
    const openDeleteModal = (shopId) => {

        setModalContent(
            <DeleteShopModal
                onConfirm={() => handleDelete(shopId)}
                onCancel={closeModal}
            />
        );
    };
    const handleUpdateShopSuccess = () => {
        dispatch(fetchShopsByUserId());
    };

    if (!sessionUser) {
        return null
    }

    return (

        <div className="shop-page">
            <div className="headers">
                {userShops.length > 0 && (
                    <h2>My Shops</h2>
                )}
                {userShops.length > 0 && (
                    <button onClick={() => setModalContent(<CreateShopModal closeModal={closeModal} />)}>
                        Create new shop
                    </button>
                )}
            </div>
            {userShops.length > 0 ? (
                <div>
                    {userShops.map((shop) => (
                        <div key={shop.id} className="shopContainer">
                            <div className="shop">
                                <div className="shop-left">
                                    <div className='shopname' onClick={() => navigate(`/shop/${shop.id}/products`)}>
                                        {shop.shopname}
                                    </div>
                                    <div className="shop-btn">
                                        <button onClick={() => setModalContent(<UpdateShop shopId={shop.id} onSuccess={handleUpdateShopSuccess} />)}>Update</button>
                                        <button className='deleteshop-button' onClick={() => openDeleteModal(shop.id)}>Delete</button>
                                    </div>
                                </div>
                                <div className="shopurl">
                                    <span onClick={() => navigate(`/shop/${shop.id}/products`)}>{shop.shopname}.craftcove.com<button style={{padding:'3px',margin:'0px 8px'}}>visit products</button></span>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-shops-message">
                    <p>Hey, you currently have no shops. Would you like to <button onClick={() => setModalContent(<CreateShopModal closeModal={closeModal} />)} >create a new shop</button>?</p>
                </div>
            )}
        </div>

    );
}

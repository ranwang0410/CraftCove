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

    // const [tooltipText, setTooltipText] = useState('Copy link');
    const { closeModal, setModalContent } = useModal()

    useEffect(() => {
        if (sessionUser) {
            dispatch(fetchShopsByUserId());
        }
    }, [dispatch, sessionUser]);

    // useEffect(() => {
    //     const tooltipInit = userShops.reduce((acc, shop) => ({
    //         ...acc,
    //         [shop.id]: 'Copy link'
    //     }), {});
    //     setTooltipText(tooltipInit);
    // }, [userShops]);


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

    // const copyToClipboard = (text, shopId) => {
    //     navigator.clipboard.writeText(text).then(() => {
    //         setTooltipText(prevState => ({ ...prevState, [shopId]: 'Copied' }));

    //         setTimeout(() => {
    //             setTooltipText(prevState => ({ ...prevState, [shopId]: 'Copy link' }));
    //         }, 2000);
    //     }).catch(err => {
    //         console.error('Failed to copy: ', err);
    //     });
    // };


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

                                    {/* <span
                                        onClick={() => copyToClipboard(`${shop.shopname}.craftcove.com`, shop.id)}
                                        onMouseEnter={() => setTooltipText(prev => ({ ...prev, [shop.id]: 'Copy link' }))}
                                        style={{ cursor: 'pointer' }}>
                                        <i className="fas fa-link"></i> <span>{tooltipText[shop.id]}</span>
                                    </span> */}
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

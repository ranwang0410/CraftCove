import { useNavigate, useParams, NavLink } from "react-router-dom";
import { getProductsByShopId } from "../../redux/product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SettingsModal from "../SettingIconModal/SettingIconModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import './GetProductByShopId.css'

export default function GetProductByShopId() {
    const { shopId } = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products.products)

    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (shopId) {
            dispatch(getProductsByShopId(shopId))
        }
    }, [dispatch, shopId])

    const openSettings = (product) => {
        setShowSettingsModal(true)
        setSelectedProduct(product)
    }

    const closeSettingsModal = () => {
        setShowSettingsModal(false);
    };

    const handleEdit = () => {
        navigate(`/product/update/${selectedProduct.id}`);
        setShowSettingsModal(false);
    };
    const handleDeleteOption = () => {
        if (!selectedProduct) {
            console.error("No product selected for deletion");
            return;
        }
        // console.log("Selected product for deletion:", selectedProduct);
        setShowSettingsModal(false);
        setShowDeleteModal(true);
    };
    const handleProductClick = (productId) => {

        navigate(`/product/update/${productId}`);
    };

    const handleCloseDeleteModal = () =>{
        setShowDeleteModal(false)
    }

    const refreshProducts = () => {
        dispatch(getProductsByShopId(shopId));
    };
    return (
        <div className='landing-page'>

            <div className="create-product"><button><NavLink to={`/shop/${shopId}/products/create-product`}>Create product</NavLink></button></div>
            <div className="product-list-shopid">
            {products ? (
                <div>
                    {products?.map((product) => (
                        <div key={product.id} className="product-item-shopid">
                            <div className="product-spec" onClick={() => handleProductClick(product.id)}>
                                <img src={product.image1 ? product.image1 : undefined} alt={product.product_name} />
                                <h3>{product.product_name}</h3>
                                <p style={{ fontWeight: 'bold' }}>${product.price}</p>
                            </div>
                            <button onClick={() => openSettings(product)} className="setting-btn"><i className="fa fa-cog" aria-hidden="true"></i><i className="fa fa-caret-down" aria-hidden="true"></i></button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products found for this shop.</p>
            )}
            {showSettingsModal && (
                <SettingsModal
                    isOpen={showSettingsModal}
                    onClose={closeSettingsModal}
                    onEdit={handleEdit}
                    onDelete={handleDeleteOption}
                />
            )}

            {showDeleteModal && selectedProduct ? (
                <DeleteModal
                    productId={selectedProduct.id}
                    onCancel={handleCloseDeleteModal}
                    afterDelete={refreshProducts}
                />
            ) : null}
            </div>
        </div>
    )
}

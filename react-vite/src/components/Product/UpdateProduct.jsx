import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateProductAction, getProductDetail } from "../../redux/product";
import { useParams, useNavigate } from "react-router-dom";


export default function UpdateProduct() {
    const { productId } = useParams();
    const productDetail = useSelector(state => state.product.productDetail);

    const [product_name, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDescription] = useState('');
    const [image1, setImage1] = useState(null);
    const [categorie, setCategorie] = useState('');
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (productId) {
            dispatch(getProductDetail(productId));
        }
    }, [dispatch, productId]);

    useEffect(()=>{
        if(productDetail){
            setProductName(productDetail.product_name || '');
            setPrice(productDetail.price || '');
            setDescription(productDetail.desc || '');
            // setImage1(productDetail.image1 || '');
            setCategorie(productDetail.categorie || '')
        }
    },[productDetail])

    const validateForm = () => {
        const newErrors = {};
        if (!product_name) newErrors.product_name = 'Product name cannot be empty';
        if (!price) newErrors.price = 'Price cannot be empty';
        if (!desc) newErrors.desc = 'Description cannot be empty';
        if (!categorie) newErrors.categorie = 'Categorie cannot be empty';
        // if (!image1) newErrors.image1 = 'Image1 cannot be empty';
        if (isNaN(price) || parseFloat(price) <= 0) newErrors.price = "Price should be a positive number.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        const formData = new FormData();
        formData.append('product_name', name);
        formData.append('price', price);
        formData.append('desc', desc);
        if (image1) formData.append('image1', image1);
        formData.append('categorie', categorie);

        dispatch(updateProductAction(productId, formData))
            .then(() => {
                navigate(`/shop/${productDetail.shop_id}/products`);
            }).catch((error) => {
                console.error('Failed to update the product', error);
                setErrors({ general: 'The product name already exist.' });
            });
        }
    // useEffect(() => {

    //     if (productDetail) {
            // setProductName(productDetail.product_name || '');
            // setPrice(productDetail.price || '');
            // setDescription(productDetail.desc || '');
            // // setImage1(productDetail.image1 || '');
            // setCategorie(productDetail.categorie || '');
    //     }
    // }, [productDetail]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();


    //     setErrors({})
    //     let newErrors = {};
    //     if (!product_name) newErrors.product_name = 'Product name cannot be empty';
    //     if (!price) newErrors.price = 'Price cannot be empty';
    //     if (!desc) newErrors.desc = 'description cannot be empty';
    //     if (!categorie) newErrors.categorie = 'categorie cannot be empty'
    //     if (!image1) newErrors.image1 = 'Image1 cannot be empty'
    //     if (isNaN(price) || parseFloat(price) <= 0) newErrors.price = "Price should be a positive number.";
    //     // if (Object.keys(newErrors).length > 0) return;
    //     try {
    //         if (Object.keys(newErrors).length === 0) {
    //             await dispatch(updateProductAction(productId, { product_name: product_name, price: price, desc: desc, image1: image1, categorie: categorie }))
    //             navigate(`/shop/${productDetail.shop_id}/products`)
    //         }
    //     }
    //     catch (error) {
    //         console.error('Error updating product:', error);

    //         // setErrors({ general: 'The product name already exist.' });
    //         newErrors.general = 'The product name already exist.'
    //     }
    //     console.log('this is below the catch')
    //     setErrors(newErrors);
    // };
    return (
        <div>

            <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
                <label htmlFor="productName">New Product Name:</label>
                <input
                    id="productName"
                    type="text"
                    value={product_name}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
                {errors.general && <div style={{ color: 'red' }}>{errors.general}</div>}
                {errors.product_name && <div style={{ color: 'red' }}>{errors.product_name}</div>}
                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                {errors.price && <div style={{ color: 'red' }}>{errors.price}</div>}
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={desc}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                {errors.desc && <div style={{ color: 'red' }}>{errors.desc}</div>}
                <label htmlFor="image">Image URL</label>
                <input
                    // id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage1(e.target.files[0])}
                />
                {/* <label htmlFor="image">Image URL</label>
                <input
                    id="image"
                    type="text"
                    value={image1}
                    onChange={(e) => setImage1(e.target.value)}
                /> */}
                {errors.image1 && <div style={{ color: 'red' }}>{errors.image1}</div>}
                <label htmlFor="category">Category</label>
                <input
                    id="category"
                    type="text"
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                    required
                />
                {errors.categorie && <div style={{ color: 'red' }}>{errors.categorie}</div>}
                <button type="submit">Update Product</button>
            </form>
        </div>
    )
}

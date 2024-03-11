import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createProduct } from "../../redux/product";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateProduct() {
    const dispatch = useDispatch();
    const { shopId } = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image1, setImage1] = useState(null)//
    const [categorie, setCategorie] = useState('')
    const [desc, setDesc] = useState('')
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const validateForm = () => {
        // console.log('image1==>',image1);
        const newErrors = {};
        if (!name) newErrors.product_name = 'Product name cannot be empty';
        if (!price) newErrors.price = 'Price cannot be empty';
        if (!desc) newErrors.desc = 'Description cannot be empty';
        if (!categorie) newErrors.categorie = 'Categorie cannot be empty';
        if (image1 === null) newErrors.image1 = 'Image1 cannot be empty';
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

        const formData = new FormData()
        formData.append('shop_id', shopId)
        formData.append('product_name', name);
        formData.append('price', price);
        if (image1) formData.append('image1', image1);
        formData.append('categorie', categorie);
        formData.append('desc', desc);
        console.log('formData--->',formData.get('image1'))
        dispatch(createProduct((formData)))
            .then(() => {
                navigate(`/shop/${shopId}/products`)
            }).catch((error) => {
                console.error('Failed to create a product', error)
                setErrors({ product_name: "The product name already exist." });
                // setErrors(prevErrors => ({ ...prevErrors, form: error.message }));
            })

        setName('')
        setPrice('')
        setImage1(null)
        setCategorie('')
        setDesc('')

    }
    return (
        <div>

            <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
                <label htmlFor="name">Product Name:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {errors.product_name && <div style={{ color: 'red' }}>{errors.product_name}</div>}

                <label htmlFor="price">Price:</label>
                <input
                    id="price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                {errors.price && <div style={{ color: 'red' }}>{errors.price}</div>}
                {/* <label htmlFor="image1">Image1 Url:</label>
                <input
                    id="image1"
                    type="text"
                    value={image1}
                    onChange={(e) => setImage1(e.target.value)}
                    required
                /> */}
                <label htmlFor="image1">Image1 Url:</label>
                <input
                    // id="image1"
                    type="file"
                    accept="image/*"
                    // onChange={(e) => setImage1(e.target.files[0])}
                    onChange={(e) => {
                        // console.log('File input changed:', e.target.files[0]);
                        setImage1(e.target.files[0]);
                    }}
                    required
                />

                {errors.image1 && <div style={{ color: 'red' }}>{errors.image1}</div>}
                <label htmlFor="categorie">Categorie:</label>
                <input
                    id="categorie"
                    type="text"
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                    required
                />
                {errors.categorie && <div style={{ color: 'red' }}>{errors.categorie}</div>}
                <label htmlFor="desc">Descrition:</label>
                <input
                    id="desc"
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />
                {errors.desc && <div style={{ color: 'red' }}>{errors.desc}</div>}
                <button type="submit" >Create Product</button>
            </form>
        </div>
    )
}

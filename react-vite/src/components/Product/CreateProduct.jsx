import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createProduct,getProductDetail } from "../../redux/product";



export default function CreateProduct() {
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image1, setImage1] = useState('')
    const [categorie, setCategorie] = useState('')
    const [desc, setDesc] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createProduct({ product_name: name, price: price, image1: image1, categorie: categorie, desc: desc }))
            .then((newProductId) => {
                dispatch(getProductDetail(newProductId));
            }).catch((error) => {
                console.error('Failed to create a product', error)
            })
        setName('')
        setPrice('')
        setImage1('')
        setCategorie('')
        setDesc('')

    }
    return (
        <div>
            <h2>Add Listing</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Product Name:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="price">Price:</label>
                <input
                    id="price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <label htmlFor="image1">Image1 Url:</label>
                <input
                    id="image1"
                    type="text"
                    value={image1}
                    onChange={(e) => setImage1(e.target.value)}
                    required
                />

                <label htmlFor="categorie">Categorie:</label>
                <input
                    id="categorie"
                    type="text"
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                    required
                />

                <label htmlFor="desc">Descrition:</label>
                <input
                    id="desc"
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />

                <button type="submit" >Create Product</button>
            </form>
        </div>
    )
}

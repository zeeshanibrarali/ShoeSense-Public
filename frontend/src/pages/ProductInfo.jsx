import React, { useEffect, useState } from 'react';
import Header from '../components/header.jsx';
import ProductDetails from '../components/ProductDetails';
import { useParams } from 'react-router-dom';

export default function ProductInfo() {

    const { productID } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/products/product-info/${productID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setProduct(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productID]);

    return (
        <>
            <Header />
            {product && <ProductDetails product={product} />}
        </>
    )
}

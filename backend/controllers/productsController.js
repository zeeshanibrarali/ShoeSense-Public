const Product = require('../models/products');

const featuredProducts = async (req, res) => {
    try {
        // Fetch top 12 products based on score
        const products = await Product.find().sort({ score: -1 }).limit(12);
        res.json({
            success: true,
            data: products,
            message: "Featured Products sent successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to fetch products' });
    }
}

const productInfo = async (req, res) => {
    const { productID } = req.params;
    try {
        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }
        res.json({
            success: true,
            data: product,
            message: "Product sent successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to fetch product details' });
    }
}

const productsMen = async (req, res) => {
    try {
        const products = await Product.find({ gender: { $in: ['Male', 'Both'] } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const productsWomen = async (req, res) => {
    try {
        const products = await Product.find({ gender: { $in: ['Female', 'Both'] } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const latestProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch the latest products', error });
    }
};

module.exports = {
    featuredProducts,
    productInfo,
    productsMen,
    productsWomen,
    latestProducts
};
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Models
const User = require('./models/users');
const Product = require('./models/products');
const Order = require('./models/orders');

// Controllers
const { handleLoginController, handleSignupController, handleTestController } = require('./controllers/authController');
const { featuredProducts, productInfo, productsMen, productsWomen, latestProducts } = require('./controllers/productsController');

// Middlewares
const requireSignIn = require('./middlewares/authMiddleware');

// config
const connectDB = require('./config/database');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

connectDB();

// Routes
app.post('/signup', handleSignupController);
app.post('/login', handleLoginController);

app.get('/products/featured-products', featuredProducts);
app.get('/products/latestProducts', latestProducts);
app.get('/products/product-info/:productID', productInfo);
app.get('/products/men', productsMen);
app.get('/products/women', productsWomen);

app.get('/checkAuth', requireSignIn, (req, res) => {
    res.status(200).json({ message: 'You are authenticated', ok: true });
});

app.listen('3000', function () {
    console.log("server is running on Port 3000");
});


// const products = [
//     {
//         name: "Nike Air Force 1",
//         brand: "Nike",
//         style: "casual",
//         price: 80.99,
//         color: "White",
//         size: "S",
//         imageURL: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/22cce236-9223-4916-abd8-ad7267d9f4ac/air-force-1-07-lv8-shoes-g2c8Rd.png"
//     },
//     {
//         name: "Adidas Superstar",
//         brand: "Adidas",
//         style: "casual",
//         price: 70.00,
//         color: "Black",
//         size: "M",
//         imageURL: "https://www.urbanathletics.com.ph/cdn/shop/products/adidassuperstarblackandwhite.jpg?v=1715581128&width=1200"
//     },
//     {
//         name: "Converse Chuck Taylor",
//         brand: "Converse",
//         style: "casual",
//         price: 50.00,
//         color: "Red",
//         size: "L",
//         imageURL: "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw12efb957/images/g_08/M9166_G_08X1.jpg?sw=406"
//     },
//     {
//         name: "Vans Old Skool",
//         brand: "Vans",
//         style: "casual",
//         price: 60.00,
//         color: "Blue",
//         size: "XL",
//         imageURL: "https://www.vans.com.au/media/catalog/product/v/n/vna5fcby28_bkw_01.jpg?auto=webp&quality=85&format=pjpg&width=100%25&fit=cover"
//     },
//     {
//         name: "New Balance 574",
//         brand: "New Balance",
//         style: "casual",
//         price: 80.00,
//         color: "Green",
//         size: "S",
//         imageURL: "https://www.jcrew.com/s7-img-facade/BO535_EE4151?hei=850&crop=0,0,680,0"
//     },
//     {
//         name: "Reebok Classic Leather",
//         brand: "Reebok",
//         style: "casual",
//         price: 65.00,
//         color: "Brown",
//         size: "M",
//         imageURL: "https://reebok.ph/cdn/shop/files/100008491_FLT_eCom_SS22.jpg?v=1703126968&width=1445"
//     },
//     {
//         name: "Puma Suede",
//         brand: "Puma",
//         style: "casual",
//         price: 75.00,
//         color: "Yellow",
//         size: "L",
//         imageURL: "https://i8.amplience.net/i/jpl/jd_690792_a?qlt=92&w=600&h=425&v=1&fmt=auto"
//     },
//     {
//         name: "Asics Gel-Kayano",
//         brand: "Asics",
//         style: "athletic",
//         price: 120.00,
//         color: "Black",
//         size: "XL",
//         imageURL: "https://images.asics.com/is/image/asics/1202A056_113_SR_RT_GLB?$sfcc-product$"
//     },
//     {
//         name: "Brooks Ghost",
//         brand: "Brooks",
//         style: "athletic",
//         price: 110.00,
//         color: "Blue",
//         size: "S",
//         imageURL: "https://www.theathletesfoot.com.au/media/catalog/product/cache/ec8945dbe7a391c1e946b836b9ec023c/1/1/110394-022-l-ghost-15-gtx-mens-neutral-cushion-running-shoe.jpg"
//     },
//     {
//         name: "Under Armour Curry",
//         brand: "Under Armour",
//         style: "athletic",
//         price: 100.00,
//         color: "Red",
//         size: "M",
//         imageURL: "https://underarmour.scene7.com/is/image/Underarmour/3024397-101_DEFAULT?rp=standard-30pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=f0f0f0&wid=566&hei=708&size=536,688"
//     },
//     {
//         name: "Nike Air Force 1",
//         brand: "Nike",
//         style: "casual",
//         price: 80.99,
//         color: "White",
//         size: "S",
//         imageURL: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/22cce236-9223-4916-abd8-ad7267d9f4ac/air-force-1-07-lv8-shoes-g2c8Rd.png"
//     },
//     {
//         name: "Adidas Superstar",
//         brand: "Adidas",
//         style: "casual",
//         price: 70.00,
//         color: "Black",
//         size: "M",
//         imageURL: "https://www.urbanathletics.com.ph/cdn/shop/products/adidassuperstarblackandwhite.jpg?v=1715581128&width=1200"
//     },
//     {
//         name: "Converse Chuck Taylor",
//         brand: "Converse",
//         style: "casual",
//         price: 50.00,
//         color: "Red",
//         size: "L",
//         imageURL: "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw12efb957/images/g_08/M9166_G_08X1.jpg?sw=406"
//     },
//     {
//         name: "Vans Old Skool",
//         brand: "Vans",
//         style: "casual",
//         price: 60.00,
//         color: "Blue",
//         size: "XL",
//         imageURL: "https://www.vans.com.au/media/catalog/product/v/n/vna5fcby28_bkw_01.jpg?auto=webp&quality=85&format=pjpg&width=100%25&fit=cover"
//     },
//     {
//         name: "New Balance 574",
//         brand: "New Balance",
//         style: "casual",
//         price: 80.00,
//         color: "Green",
//         size: "S",
//         imageURL: "https://www.jcrew.com/s7-img-facade/BO535_EE4151?hei=850&crop=0,0,680,0"
//     },
//     {
//         name: "Reebok Classic Leather",
//         brand: "Reebok",
//         style: "casual",
//         price: 65.00,
//         color: "Brown",
//         size: "M",
//         imageURL: "https://reebok.ph/cdn/shop/files/100008491_FLT_eCom_SS22.jpg?v=1703126968&width=1445"
//     },
//     {
//         name: "Puma Suede",
//         brand: "Puma",
//         style: "casual",
//         price: 75.00,
//         color: "Yellow",
//         size: "L",
//         imageURL: "https://i8.amplience.net/i/jpl/jd_690792_a?qlt=92&w=600&h=425&v=1&fmt=auto"
//     },
//     {
//         name: "Asics Gel-Kayano",
//         brand: "Asics",
//         style: "athletic",
//         price: 120.00,
//         color: "Black",
//         size: "XL",
//         imageURL: "https://images.asics.com/is/image/asics/1202A056_113_SR_RT_GLB?$sfcc-product$"
//     },
//     {
//         name: "Brooks Ghost",
//         brand: "Brooks",
//         style: "athletic",
//         price: 110.00,
//         color: "Blue",
//         size: "S",
//         imageURL: "https://www.theathletesfoot.com.au/media/catalog/product/cache/ec8945dbe7a391c1e946b836b9ec023c/1/1/110394-022-l-ghost-15-gtx-mens-neutral-cushion-running-shoe.jpg"
//     },
//     {
//         name: "Under Armour Curry",
//         brand: "Under Armour",
//         style: "athletic",
//         price: 100.00,
//         color: "Red",
//         size: "M",
//         imageURL: "https://underarmour.scene7.com/is/image/Underarmour/3024397-101_DEFAULT?rp=standard-30pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=f0f0f0&wid=566&hei=708&size=536,688"
//     },
//     {
//         name: "Nike Air Force 1",
//         brand: "Nike",
//         style: "casual",
//         price: 80.99,
//         color: "White",
//         size: "S",
//         imageURL: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/22cce236-9223-4916-abd8-ad7267d9f4ac/air-force-1-07-lv8-shoes-g2c8Rd.png"
//     },
//     {
//         name: "Adidas Superstar",
//         brand: "Adidas",
//         style: "casual",
//         price: 70.00,
//         color: "Black",
//         size: "M",
//         imageURL: "https://www.urbanathletics.com.ph/cdn/shop/products/adidassuperstarblackandwhite.jpg?v=1715581128&width=1200"
//     },
//     {
//         name: "Converse Chuck Taylor",
//         brand: "Converse",
//         style: "casual",
//         price: 50.00,
//         color: "Red",
//         size: "L",
//         imageURL: "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw12efb957/images/g_08/M9166_G_08X1.jpg?sw=406"
//     },
//     {
//         name: "Vans Old Skool",
//         brand: "Vans",
//         style: "casual",
//         price: 60.00,
//         color: "Blue",
//         size: "XL",
//         imageURL: "https://www.vans.com.au/media/catalog/product/v/n/vna5fcby28_bkw_01.jpg?auto=webp&quality=85&format=pjpg&width=100%25&fit=cover"
//     },
//     {
//         name: "New Balance 574",
//         brand: "New Balance",
//         style: "casual",
//         price: 80.00,
//         color: "Green",
//         size: "S",
//         imageURL: "https://www.jcrew.com/s7-img-facade/BO535_EE4151?hei=850&crop=0,0,680,0"
//     },
//     {
//         name: "Reebok Classic Leather",
//         brand: "Reebok",
//         style: "casual",
//         price: 65.00,
//         color: "Brown",
//         size: "M",
//         imageURL: "https://reebok.ph/cdn/shop/files/100008491_FLT_eCom_SS22.jpg?v=1703126968&width=1445"
//     },
//     {
//         name: "Puma Suede",
//         brand: "Puma",
//         style: "casual",
//         price: 75.00,
//         color: "Yellow",
//         size: "L",
//         imageURL: "https://i8.amplience.net/i/jpl/jd_690792_a?qlt=92&w=600&h=425&v=1&fmt=auto"
//     },
//     {
//         name: "Asics Gel-Kayano",
//         brand: "Asics",
//         style: "athletic",
//         price: 120.00,
//         color: "Black",
//         size: "XL",
//         imageURL: "https://images.asics.com/is/image/asics/1202A056_113_SR_RT_GLB?$sfcc-product$"
//     },
//     {
//         name: "Brooks Ghost",
//         brand: "Brooks",
//         style: "athletic",
//         price: 110.00,
//         color: "Blue",
//         size: "S",
//         imageURL: "https://www.theathletesfoot.com.au/media/catalog/product/cache/ec8945dbe7a391c1e946b836b9ec023c/1/1/110394-022-l-ghost-15-gtx-mens-neutral-cushion-running-shoe.jpg"
//     },
//     {
//         name: "Under Armour Curry",
//         brand: "Under Armour",
//         style: "athletic",
//         price: 100.00,
//         color: "Red",
//         size: "M",
//         imageURL: "https://underarmour.scene7.com/is/image/Underarmour/3024397-101_DEFAULT?rp=standard-30pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=f0f0f0&wid=566&hei=708&size=536,688"
//     },
//     {
//         name: "Nike Air Force 1",
//         brand: "Nike",
//         style: "casual",
//         price: 80.99,
//         color: "White",
//         size: "S",
//         imageURL: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/22cce236-9223-4916-abd8-ad7267d9f4ac/air-force-1-07-lv8-shoes-g2c8Rd.png"
//     },
//     {
//         name: "Adidas Superstar",
//         brand: "Adidas",
//         style: "casual",
//         price: 70.00,
//         color: "Black",
//         size: "M",
//         imageURL: "https://www.urbanathletics.com.ph/cdn/shop/products/adidassuperstarblackandwhite.jpg?v=1715581128&width=1200"
//     },
//     {
//         name: "Converse Chuck Taylor",
//         brand: "Converse",
//         style: "casual",
//         price: 50.00,
//         color: "Red",
//         size: "L",
//         imageURL: "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw12efb957/images/g_08/M9166_G_08X1.jpg?sw=406"
//     },
//     {
//         name: "Vans Old Skool",
//         brand: "Vans",
//         style: "casual",
//         price: 60.00,
//         color: "Blue",
//         size: "XL",
//         imageURL: "https://www.vans.com.au/media/catalog/product/v/n/vna5fcby28_bkw_01.jpg?auto=webp&quality=85&format=pjpg&width=100%25&fit=cover"
//     },
//     {
//         name: "New Balance 574",
//         brand: "New Balance",
//         style: "casual",
//         price: 80.00,
//         color: "Green",
//         size: "S",
//         imageURL: "https://www.jcrew.com/s7-img-facade/BO535_EE4151?hei=850&crop=0,0,680,0"
//     },
//     {
//         name: "Reebok Classic Leather",
//         brand: "Reebok",
//         style: "casual",
//         price: 65.00,
//         color: "Brown",
//         size: "M",
//         imageURL: "https://reebok.ph/cdn/shop/files/100008491_FLT_eCom_SS22.jpg?v=1703126968&width=1445"
//     },
//     {
//         name: "Puma Suede",
//         brand: "Puma",
//         style: "casual",
//         price: 75.00,
//         color: "Yellow",
//         size: "L",
//         imageURL: "https://i8.amplience.net/i/jpl/jd_690792_a?qlt=92&w=600&h=425&v=1&fmt=auto"
//     },
//     {
//         name: "Asics Gel-Kayano",
//         brand: "Asics",
//         style: "athletic",
//         price: 120.00,
//         color: "Black",
//         size: "XL",
//         imageURL: "https://images.asics.com/is/image/asics/1202A056_113_SR_RT_GLB?$sfcc-product$"
//     },
//     {
//         name: "Brooks Ghost",
//         brand: "Brooks",
//         style: "athletic",
//         price: 110.00,
//         color: "Blue",
//         size: "S",
//         imageURL: "https://www.theathletesfoot.com.au/media/catalog/product/cache/ec8945dbe7a391c1e946b836b9ec023c/1/1/110394-022-l-ghost-15-gtx-mens-neutral-cushion-running-shoe.jpg"
//     },
//     {
//         name: "Under Armour Curry",
//         brand: "Under Armour",
//         style: "athletic",
//         price: 100.00,
//         color: "Red",
//         size: "M",
//         imageURL: "https://underarmour.scene7.com/is/image/Underarmour/3024397-101_DEFAULT?rp=standard-30pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=f0f0f0&wid=566&hei=708&size=536,688"
//     },
//     {
//         name: "Nike Air Force 1",
//         brand: "Nike",
//         style: "casual",
//         price: 80.99,
//         color: "White",
//         size: "S",
//         imageURL: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/22cce236-9223-4916-abd8-ad7267d9f4ac/air-force-1-07-lv8-shoes-g2c8Rd.png"
//     },
//     {
//         name: "Adidas Superstar",
//         brand: "Adidas",
//         style: "casual",
//         price: 70.00,
//         color: "Black",
//         size: "M",
//         imageURL: "https://www.urbanathletics.com.ph/cdn/shop/products/adidassuperstarblackandwhite.jpg?v=1715581128&width=1200"
//     },
//     {
//         name: "Converse Chuck Taylor",
//         brand: "Converse",
//         style: "casual",
//         price: 50.00,
//         color: "Red",
//         size: "L",
//         imageURL: "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw12efb957/images/g_08/M9166_G_08X1.jpg?sw=406"
//     },
//     {
//         name: "Vans Old Skool",
//         brand: "Vans",
//         style: "casual",
//         price: 60.00,
//         color: "Blue",
//         size: "XL",
//         imageURL: "https://www.vans.com.au/media/catalog/product/v/n/vna5fcby28_bkw_01.jpg?auto=webp&quality=85&format=pjpg&width=100%25&fit=cover"
//     },
//     {
//         name: "New Balance 574",
//         brand: "New Balance",
//         style: "casual",
//         price: 80.00,
//         color: "Green",
//         size: "S",
//         imageURL: "https://www.jcrew.com/s7-img-facade/BO535_EE4151?hei=850&crop=0,0,680,0"
//     },
//     {
//         name: "Reebok Classic Leather",
//         brand: "Reebok",
//         style: "casual",
//         price: 65.00,
//         color: "Brown",
//         size: "M",
//         imageURL: "https://reebok.ph/cdn/shop/files/100008491_FLT_eCom_SS22.jpg?v=1703126968&width=1445"
//     },
//     {
//         name: "Puma Suede",
//         brand: "Puma",
//         style: "casual",
//         price: 75.00,
//         color: "Yellow",
//         size: "L",
//         imageURL: "https://i8.amplience.net/i/jpl/jd_690792_a?qlt=92&w=600&h=425&v=1&fmt=auto"
//     },
//     {
//         name: "Asics Gel-Kayano",
//         brand: "Asics",
//         style: "athletic",
//         price: 120.00,
//         color: "Black",
//         size: "XL",
//         imageURL: "https://images.asics.com/is/image/asics/1202A056_113_SR_RT_GLB?$sfcc-product$"
//     },
//     {
//         name: "Brooks Ghost",
//         brand: "Brooks",
//         style: "athletic",
//         price: 110.00,
//         color: "Blue",
//         size: "S",
//         imageURL: "https://www.theathletesfoot.com.au/media/catalog/product/cache/ec8945dbe7a391c1e946b836b9ec023c/1/1/110394-022-l-ghost-15-gtx-mens-neutral-cushion-running-shoe.jpg"
//     },
//     {
//         name: "Under Armour Curry",
//         brand: "Under Armour",
//         style: "athletic",
//         price: 100.00,
//         color: "Red",
//         size: "M",
//         imageURL: "https://underarmour.scene7.com/is/image/Underarmour/3024397-101_DEFAULT?rp=standard-30pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=f0f0f0&wid=566&hei=708&size=536,688"
//     }
// ]

// async function insertProducts() {
//     try {
//         await Product.insertMany(products);
//         console.log('Products inserted successfully!');
//     } catch (err) {
//         console.error('Error inserting products:', err);
//     }
// }

// insertProducts();
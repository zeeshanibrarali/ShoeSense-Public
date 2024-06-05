import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';

export default function ProductDetails({ product }) {

    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();

    const handleAddToCart = (product) => {
        if (!auth.token) {
            toast.error('Make sure to log in first to perform this action');
            return;
        }
        setCart([...cart, product]);
        localStorage.setItem('cart', JSON.stringify([...cart, product]));
        toast.success('Item added to cart');
    }

    return (
        <div className='container mx-auto p-4 m-8'>

            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/***product Image */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                        <img src={product.imageURL} className='h-full w-full object-scale-down mix-blend-multiply' />
                    </div>

                    <div className='h-full'>

                        {/* Loading animation */}
                        {/* <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                            <div className='h-20 w-20 bg-slate-200 rounded animate-pulse'>
                            </div>
                        </div> */}

                        <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                            <div className='h-20 w-20 bg-slate-200 rounded p-1' key={product.imageURL}>
                                <img src={product.imageURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' />
                            </div>
                            <div className='h-20 w-20 bg-slate-200 rounded p-1' key={product.imageURL}>
                                <img src={product.imageURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' />
                            </div>
                            <div className='h-20 w-20 bg-slate-200 rounded p-1' key={product.imageURL}>
                                <img src={product.imageURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' />
                            </div>
                        </div>
                    </div>
                </div>

                {/***product details */}

                {/* Loading animation */}
                {/* <div className='grid gap-1 w-full'>
                    <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
                    <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
                    <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

                    <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>

                    </div>

                    <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                        <p className='text-red-600 bg-slate-200 w-full'></p>
                        <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                    </div>

                    <div className='flex items-center gap-3 my-2 w-full'>
                        <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                        <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                    </div>

                    <div className='w-full'>
                        <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
                        <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
                    </div>
                </div> */}

                <div className='flex flex-col gap-1'>
                    <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{product.brand}</p>
                    <h2 className='text-2xl lg:text-4xl font-medium'>{product.name}</h2>
                    <p className='capitalize text-slate-400'>{product.style}</p>

                    <div className='text-red-600 flex items-center gap-1'>
                        {product.size}
                    </div>

                    <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                        <p className='text-red-600'>{product.price.$numberDecimal}$</p>
                        <p className='text-slate-400 line-through'>{(product.price.$numberDecimal * 1.5).toFixed(2)}$</p>
                    </div>

                    <div className='flex items-center gap-3 my-2'>
                        <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'>Buy</button>
                        <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white hover:border-red-600'
                            onClick={() => handleAddToCart(product)}>Add To Cart</button>
                    </div>

                    <div>
                        <p className='text-slate-600 font-medium my-1'>Description : </p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur ipsa labore earum cumque est. At accusantium blanditiis possimus autem commodi molestiae libero nam modi repellat eos magnam perspiciatis dignissimos facere nisi necessitatibus aut amet illo repellendus est tenetur, vero fuga.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

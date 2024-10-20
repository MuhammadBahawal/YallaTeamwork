import React, { useEffect, useState } from 'react';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import Ratings from '../components/Ratings';
import { AiFillHeart } from 'react-icons/ai';
import { FaFacebookF, FaLinkedin } from 'react-icons/fa';
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';
import Reviews from '../components/Reviews';
import { get_product } from '../store/reducers/homeReducer';
import { add_to_card, messageClear, add_to_wishlist } from '../store/reducers/cardReducer';
import toast from 'react-hot-toast';
import axios from 'axios';

const Details = () => {
    const navigate = useNavigate();
    const { slug, productId, customerId } = useParams();
    const dispatch = useDispatch();
    const { product, relatedProducts, moreProducts } = useSelector(state => state.home);
    const { userInfo } = useSelector(state => state.auth);
    const { errorMessage, successMessage } = useSelector(state => state.card);
    const [message, setMessage] = useState("");
    const [image, setImage] = useState('');
    const [state, setState] = useState('reviews');
    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
        mdtablet: { breakpoint: { max: 991, min: 464 }, items: 4 },
        mobile: { breakpoint: { max: 768, min: 0 }, items: 3 },
        smmobile: { breakpoint: { max: 640, min: 0 }, items: 2 },
        xsmobile: { breakpoint: { max: 440, min: 0 }, items: 1 }
    };

    const [quantity, setQuantity] = useState(1);

    const inc = () => {
        if (quantity >= product.stock) {
            toast.error('Out of stock');
        } else {
            setQuantity(quantity + 1);
        }
    };

    const dec = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const add_card = () => {
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity,
                productId: product._id,
                isCoupon: productId ? true : false,
                customerid: customerId ? customerId : ""
            }));
        } else {
            navigate('/login');
        }
    };

    const add_wishlist = () => {
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                discount: product.discount,
                rating: product.rating,
                slug: product.slug
            }));
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        dispatch(get_product(slug));
    }, [slug]);

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
    }, [errorMessage, successMessage]);

    const buy = () => {
        let price = 0;
        if (product.discount !== 0) {
            price = product.price - Math.floor((product.price * product.discount) / 100);
        } else {
            price = product.price;
        }
        const obj = [
            {
                sellerId: product.sellerId,
                shopName: product.shopName,
                price: quantity * (price - Math.floor((price * 5) / 100)),
                products: [
                    {
                        quantity,
                        productInfo: product
                    }
                ]
            }
        ];
        navigate('/shipping', {
            state: {
                products: obj,
                price: price * quantity,
                shipping_fee: 85,
                items: 1
            }
        });
    };

    const createReferralLink = async () => {
        try {
            const p_id = product._id;
            const newReferral = {
                customer: userInfo.id,
                productId: p_id,
                link: `/product/details/${slug}/productId/${p_id}/coupon/${userInfo.id}`,
                type: 'coupon code',
            };

            const response = await axios.post('http://localhost:5000/api/promotion/create', newReferral); // Adjust API path
            if (response.status === 200) {
                setMessage('Referral link created and copied successfully!');
                navigator.clipboard.writeText(`http://localhost:3000/product/details/${slug}/productId/${p_id}/coupon/${userInfo.id}`);
                setTimeout(() => {
                    setMessage("");
                }, 3000);
            }

            if (response?.status === 400) {
                setMessage(response.data.error);
            }
        } catch (err) {
            if (err.response) {
                setMessage(err.response.data.error);
            }
            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };

    return (
        <div>
            <Headers />
            <div className='bg-[url("http://localhost:3000/images/banner/order.jpg")] h-[220px] bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                            <h2 className='text-3xl font-bold'></h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-slate-100 py-5 mb-5'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className='flex justify-start items-center text-md text-slate-600 w-full'>
                        <Link to='/'>Home</Link>
                        <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
                        <Link to='/'>{product.category}</Link>
                        <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
                        <span>{product.name}</span>
                    </div>
                </div>
            </div>
            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                    <div className='grid grid-cols-2 md-lg:grid-cols-1 gap-8'>
                        <div>
                            <div className='p-5 border'>
                                <img className='h-[500px] w-full' src={image ? image : product.images?.[0]} alt="" />
                            </div>
                            <div className='py-3'>
                                {
                                    product.images && <Carousel
                                        autoPlay={true}
                                        infinite={true}
                                        responsive={responsive}
                                        transitionDuration={500}
                                    >
                                        {
                                            product.images.map((img, i) => {
                                                return (
                                                    <div key={i} onClick={() => setImage(img)}>
                                                        <img className='h-[120px] cursor-pointer' src={img} alt="" />
                                                    </div>
                                                );
                                            })
                                        }
                                    </Carousel>
                                }
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='text-3xl text-slate-600 font-bold'>
                                <h2>{product.name}</h2>
                            </div>
                            <div className='flex justify-start items-center gap-4'>
                                <div className='flex text-xl'>
                                    <Ratings ratings={product.rating} />
                                </div>
                                <span className='text-green-500'>(23 reviews)</span>
                            </div>
                            <div className='text-2xl text-red-500 font-bold flex gap-3'>
                                {
                                    product.discount !== 0 ? <>
                                        <h2 className='line-through'>AED{product.price}</h2>
                                        <h2>AED{product.price - Math.floor((product.price * product.discount) / 100)} (-{product.discount}%)</h2>
                                    </> : <h2>Price : AED{product.price}</h2>
                                }
                            </div>
                            <div className='flex items-center gap-5'>
                                <div className='flex gap-4'>
                                    <div className='flex flex-col'>
                                        <span className='text-slate-600'>Quantity:</span>
                                        <div className='flex border rounded-lg'>
                                            <button className='text-lg border-r px-3' onClick={dec}>-</button>
                                            <span className='text-lg px-3'>{quantity}</span>
                                            <button className='text-lg border-l px-3' onClick={inc}>+</button>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={add_card} className='bg-orange-500 hover:bg-orange-600 transition-all text-white font-bold text-lg rounded-lg py-2 px-4'>Add to Cart</button>
                                <button onClick={add_wishlist} className='bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all font-bold text-lg rounded-lg py-2 px-4 flex gap-2 items-center'><AiFillHeart /> Wishlist</button>
                            </div>
                            <div className='flex gap-5'>
                                <button onClick={buy} className='bg-green-500 hover:bg-green-600 transition-all text-white font-bold text-lg rounded-lg py-2 px-4'>Buy Now</button>
                                <button onClick={createReferralLink} className='bg-blue-500 hover:bg-blue-600 transition-all text-white font-bold text-lg rounded-lg py-2 px-4'>Get Referral Link</button>
                            </div>
                            {message && <div className='bg-green-200 p-2 text-green-800'>{message}</div>}
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-slate-100 pt-10 pb-5'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <h2 className='text-3xl font-bold'>Description</h2>
                    <p className='text-slate-600'>{product.description}</p>
                </div>
            </section>
            <section className='bg-slate-100 pt-10 pb-5'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <h2 className='text-3xl font-bold'>Related Products</h2>
                    <div className='grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                        {
                            relatedProducts.map((item, index) => (
                                <div key={index} className='border p-5'>
                                    <img src={item.images[0]} alt={item.name} className='h-[250px] w-full' />
                                    <h3 className='text-lg font-bold'>{item.name}</h3>
                                    <h3 className='text-xl text-red-500'>AED{item.price}</h3>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Details;

import React, { useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import Stripe from '../components/Stripe'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
const Payment = () => {
    const { state: {products, price, items, orderId } } = useLocation()
  
    const [paymentMethod, setPaymentMethod] = useState('stripe')
    
    const paymentdone = ()=>{
        if(products){
            products.forEach((element) => {
                element.products.forEach((item)=>{
                    if(item.isCoupon){
                        let price =item.productInfo.price
                    if(item.productInfo.discount){
                    price = item.productInfo.price - Math.floor((item.productInfo.price * item.productInfo.discount) / 100)
                    }
                    updatePromotion(item.referralBy, item.productInfo._id, price*0.05, item.quantity)
                }
                })
               
            });
        }
         
    }
    const updatePromotion = async (customerId, productId, price, quantity) => {
        try {
      
            const url = `http://localhost:5000/api/promotion/update/${customerId}/${productId}`;
    
            // Prepare the request body
            const requestBody = {
                price,
                quantity
            };
            console.log("requestBody", requestBody)
            // Make the PUT request using Axios
            const response = await axios.put(url, requestBody);
    
            // Handle the response if successful
            console.log('Promotion updated successfully:', response);
    
            return response.data; // You can return this if you need the data elsewhere
    
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error updating promotion:', error.response ? error.response.data : error.message);
        }
    };
    return (
        <div>
            <Headers />
            <section className='bg-[#eeeeee]'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4'>
                    <div className='flex flex-wrap md:flex-col-reverse'>
                        <div className='w-7/12 md:w-full'>
                            <div className='pr-2 md:pr-0'>
                                <div className='flex flex-wrap'>
                                    <div onClick={() => setPaymentMethod('stripe')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'stripe' ? 'bg-white' : 'bg-slate-100'}`}>
                                        <div className='flex flex-col gap-[3px] justify-center items-center'>
                                            <img src="http://localhost:3000/images/payment/stripe.png" alt="stripe" />
                                            <span className='text-slate-600'>Stripe</span>
                                        </div>
                                    </div>
                                   
                                  
                                   
                                </div>
                                {
                                    paymentMethod === 'stripe' && <div>
                                        <Stripe orderId={orderId} price={price} />
                                    </div>
                                }
                              
                              
                               
                            </div>
                        </div>
                        <div className='w-5/12 md:w-full'>
                            <div className='pl-2 md:pl-0 md:mb-0'>
                                <div className='bg-white shadow p-5 text-slate-600 flex flex-col gap-3'>
                                    <h2>Order Summary</h2>
                                    <div className='flex justify-between items-center'>
                                        <span>{items} items and shipping fee included</span>
                                        <span>AED{price}</span>
                                    </div>
                                    <div className='flex justify-between items-center font-semibold'>
                                        <span>Total Amount</span>
                                        <span className='text-lg text-orange-500'>AED{price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Payment
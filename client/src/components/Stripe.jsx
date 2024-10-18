import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import axios from 'axios'
import { useState } from 'react'
import CheckoutForm from './CheckoutForm'
import { stripe_sky } from '../utils/config'
import { useLocation } from 'react-router-dom'
const stripePromise = loadStripe(stripe_sky)

const Stripe = ({ price, orderId }) => {
    const { state: {products } } = useLocation()

    const [clientSecret, setClientSecret] = useState('')
    const apperance = {
        theme: 'stripe'
    }
    const options = {
        apperance,
        clientSecret
    }
    const create_payment = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/order/create-payment', { price }, { withCredentials: true })
            paymentdone()
            setClientSecret(data.clientSecret)

        } catch (error) {
            console.log(error.response.data)
        }
    }

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
        <div className='mt-4'>
            {
                clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm orderId={orderId} />
                    </Elements>
                ) : <button onClick={create_payment} className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white'>Start Payment</button>
            }
        </div>
    )
}

export default Stripe
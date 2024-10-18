import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaClipboard } from 'react-icons/fa'; // Clipboard icon from react-icons
import axios from 'axios'; // For API calls

const MyReferral = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth); // Assumed Redux store with auth
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null)

    // Fetch referrals using user ID
    useEffect(() => {
        if (userInfo?.id) {
            fetchReferrals(userInfo.id);
        }
    }, [userInfo]);

    // Function to fetch referrals from API
    const fetchReferrals = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/promotion/user/${userId}`); // Adjust API path
         
            
            if(response?.status == 201 || response?.status == 200){
                setReferrals(response.data.promotions);
            }
            
           
        } catch (err) {
           
        }
    };

    // Function to copy referral link to clipboard
    const copyToClipboard = (link) => {
        navigator.clipboard.writeText(`http://localhost:3000${link}`);
        setMessage('Referral link copied to clipboard!')

    };

    // Function to create a new referral link
    const createReferralLink = async () => {
        try {
            setLoading(true);
            setMessage("")
            const newReferral = {
                customer: userInfo.id,
                productId: null,
                link: `/register/referral/${userInfo.id}`,
                type: 'referral code',
            };
            const response = await axios.post('http://localhost:5000/api/promotion/create', newReferral); // Adjust API path
           
            if(response?.status == 400){
                 
                setMessage(response.data.error)
            }
            if(response?.status == 201 || response?.status == 200){
                setMessage('Referral link created successfully!')
            }
           
            setTimeout(() => {
                setMessage("")
            }, 3000)
            fetchReferrals(userInfo.id); // Refresh the referral list
        } catch (err) {
            if(err.response){
            setMessage(err.response.data.error)}
             
            setTimeout(() => {
                setMessage("")
            }, 3000)
        
            

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-white p-4 rounded-md'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-slate-600'>My Referrals</h2>
                <button
                    className='bg-blue-500 text-white px-4 py-2 rounded-md'
                    onClick={createReferralLink}
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Referral Link'}
                </button>
            </div>
            <div className='pt-4'>
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>Product</th>
                                <th scope='col' className='px-6 py-3'>Type</th>
                                <th scope='col' className='px-6 py-3'>Total Sold</th>
                                <th scope='col' className='px-6 py-3'>Total Earnings</th>
                                <th scope='col' className='px-6 py-3'>Payment Status</th>
                                <th scope='col' className='px-6 py-3'>Last Payment Date</th>
                                <th scope='col' className='px-6 py-3'>Referral Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {referrals.map((referral, index) => {
                                console.log("referral", referral)
                                return (


                                    <tr key={index} className='bg-white border-b'>
                                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                                            {referral.type == "coupon code" ? referral?.product?.name : "Register"}

                                        </td>
                                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                                            {referral.type}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {referral.total_sold}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {referral.total_earning}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {referral.payment_status}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {referral.last_payment_paid ? new Date(referral.last_payment_paid).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <FaClipboard
                                                className='cursor-pointer text-blue-600'
                                                onClick={() => copyToClipboard(referral.link)}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {message && <div>{message}</div>}
            </div>
        </div>
    );
};

export default MyReferral;

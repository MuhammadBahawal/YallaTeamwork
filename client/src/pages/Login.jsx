import React, { useState, useEffect } from 'react';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';
import { useSelector, useDispatch } from 'react-redux';
import { customer_login, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';

const Login = () => {
    const { loader, successMessage, errorMessage, userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const login = (e) => {
        e.preventDefault();
        dispatch(customer_login(state));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (userInfo) {
            navigate('/');
        }
    }, [successMessage, errorMessage]);

    return (
        <div>
            <Headers />
            {loader && (
                <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader />
                </div>
            )}
            <div className='bg-slate-200 mt-4'>
                <div className='w-full flex justify-center items-center p-10'>
                    <div className='flex flex-row lg:flex-col w-[80%] bg-white rounded-md shadow-lg'>
                        {/* Login Form Section */}
                        <div className='lg:w-full w-1/2 px-8 py-8'>
                            <h2 className='text-center text-xl text-slate-600 font-bold mb-4'>Login</h2>
                            <form onSubmit={login} className='text-slate-600'>
                                <div className='flex flex-col gap-1 mb-2'>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        onChange={inputHandle}
                                        value={state.email}
                                        type="email"
                                        className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md'
                                        id='email'
                                        name='email'
                                        placeholder='email'
                                    />
                                </div>
                                <div className='flex flex-col gap-1 mb-4'>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        onChange={inputHandle}
                                        value={state.password}
                                        type="password"
                                        className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md'
                                        id='password'
                                        name='password'
                                        placeholder='password'
                                    />
                                </div>
                                <button className='w-full py-2 bg-purple-500 shadow-lg hover:shadow-indigo-500/30 text-white rounded-md'>
                                    Login
                                </button>
                            </form>
                            <div className='flex justify-center items-center py-2'>
                                <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                            </div>
                            <div className='text-center text-slate-600 pt-1'>
                                <p>You have no account? <Link className='text-blue-500' to='/register'>Register</Link></p>
                            </div>
                            <div className='text-center text-slate-600 pt-1'>
                                <p><a target='_blank' className='text-blue-500' href='http://localhost:3001/register'>Register seller account</a></p>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className='lg:w-full w-[500px] w-full'>
                            <img
                                className='w-full h-auto max-h-[400px] object-cover rounded-md'
                                src="http://localhost:3000/images/login.jpg"
                                alt="Login"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;

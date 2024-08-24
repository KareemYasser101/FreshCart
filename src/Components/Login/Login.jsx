import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { AuthContext } from '../../Contexts/AuthContext';
import { Helmet } from 'react-helmet';

export default function Login() {

    //hooks
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { setUserToken } = useContext(AuthContext);
    const navigate = useNavigate();


    const initialValues = {
        "email":"",
        "password":""
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Email is required')
            .email('Enter valid email'),
        password: Yup.string()
            .required('Password is required')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character:'),
    });

    //useFormik custom hook for form handling and validation
    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })


    async function onSubmit(){
        setIsLoading(true);
        setErrorMsg("");
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
        .then((response)=>{
            setIsLoading(false);
            setUserToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setTimeout(() => {
                if(location.pathname == "/login")
                    navigate("/");
                else
                    navigate(location.pathname);
            }, 500);
        })
        .catch((err)=>{
            setIsLoading(false);
            setErrorMsg(err.response.data.message);
        })
    }

    return (
    <>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <div className="pt-24 pb-20 flex justify-center items-center">
            <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to FreshCart</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
                        <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                        {touched.email && errors.email && <p className='text-red-500'>{errors.email}</p>}
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
                        <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                       {touched.password && errors.password && <p className='text-red-500'>{errors.password}</p>}
                    </div>


                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400" disabled={isLoading} >Login {isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}</button>
                    {errorMsg && <p className='text-red-500 text-center'>{errorMsg}</p>}
                </form>

                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-500 dark:text-gray-300">Don't have an account? </span>
                    <Link to={"/register"} className="text-blue-500 hover:text-blue-600">Register</Link>
                </div>
                <div className="mt-1 text-center">
                    <Link to={"/forget-password"} className="text-blue-500 hover:text-blue-600">Forgot your password?</Link>
                </div>
            </div>
        </div>
    </>
    );
}

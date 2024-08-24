import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { Bounce, toast } from 'react-toastify';

export default function ForgetPassword() {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const initialValues = {
        "email":""
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Email is required')
            .email('Enter valid email'),
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
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
        .then((response)=>{
            console.log(response.data);
            setIsLoading(false);
            localStorage.setItem("userEmail", values.email)
            toast.success("Verification Code sent to your email", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            setTimeout(() => {
                navigate("/verify-email");
            }, 500);
        })
        .catch((err)=>{
            console.log(err.response.data.message);
            setIsLoading(false);
            setErrorMsg(err.response.data.message);
        })
    }
  return (
    <>
        <Helmet>
            <title>Forget password</title>
        </Helmet>
        <div className="pt-32 pb-20 flex justify-center items-center">
            <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Email verification</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
                        <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                        {touched.email && errors.email && <p className='text-red-500'>{errors.email}</p>}
                    </div>


                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400" disabled={isLoading} >Submit {isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}</button>
                </form>

            </div>
        </div>
    </>
  )
}

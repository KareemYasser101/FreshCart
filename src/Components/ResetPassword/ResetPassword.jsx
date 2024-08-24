import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { AuthContext } from '../../Contexts/AuthContext';

export default function ResetPassword() {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { setUserToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const initialValues = {
        "email":localStorage.getItem("userEmail"),
        "newPassword": ""
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .notRequired(),
        newPassword: Yup.string()
            .required('New password is required')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character:'),
    });

    //useFormik custom hook for form handling and validation
    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    
    async function onSubmit() {
        setIsLoading(true);
        setErrorMsg("");
        try {
            const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
            setIsLoading(false);
            setUserToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setTimeout(() => {
                navigate("/");
            }, 500);
        } catch (err) {
            setIsLoading(false);
            setErrorMsg(err.response.data.message);
        }
    }
    
  return (
    <>
        <Helmet>
            <title>Change password</title>
        </Helmet>
        <div className="pt-32 pb-20 flex justify-center items-center">
            <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-4">Change password</h1>
                <p className='text-blue-500 mb-4'>{values.email}</p>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="newPassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">New Password:</label>
                        <input onBlur={handleBlur} onChange={handleChange} value={values.newPassword} type="text" id="newPassword" name="newPassword" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                        {touched.newPassword && errors.newPassword && <p className='text-red-500'>{errors.newPassword}</p>}
                    </div>


                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400" disabled={isLoading} >Reset password {isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}</button>
                </form>

            </div>
        </div>
    </>
  )
}

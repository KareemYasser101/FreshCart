import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Notfound from './Components/Notfound/Notfound'
import AuthContextProvider from './Contexts/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectedAuthRoute from './Components/ProtectedAuthRoute/ProtectedAuthRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import ShippingAddress from './Components/ShippingAddress/ShippingAddress'
import Orders from './Components/Orders/Orders'
import { Offline } from 'react-detect-offline'
import CartContextProvider from './Contexts/NumberOfCartItems'
import Products from './Components/Products/Products'
import CategoriesFiltered from './Components/CategoriesFiltered/CategoriesFiltered'
import BrandsFiltered from './Components/BrandsFiltered/BrandsFiltered'
import WishListContextProvider from './Contexts/WishListContext'
import WishList from './Components/WishList/WishList'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import VerifyEmail from './Components/VerifyEmail/VerifyEmail'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {

  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {path: '', element: <Layout/>, children: [
      {index: true, element: <ProtectedRoute><Home/></ProtectedRoute>},
      {path: 'login', element: <ProtectedAuthRoute><Login/></ProtectedAuthRoute>},
      {path: 'forget-password', element: <ProtectedAuthRoute><ForgetPassword/></ProtectedAuthRoute>},
      {path: 'verify-email', element: <ProtectedAuthRoute><VerifyEmail/></ProtectedAuthRoute>},
      {path: 'reset-password', element: <ProtectedAuthRoute><ResetPassword/></ProtectedAuthRoute>},
      {path: 'register', element: <ProtectedAuthRoute><Register/></ProtectedAuthRoute>},
      {path: 'cart', element: <ProtectedRoute><Cart/></ProtectedRoute>},
      {path: 'products', element: <ProtectedRoute><Products/></ProtectedRoute>},
      {path: 'categories', element: <ProtectedRoute><Categories/></ProtectedRoute>},
      {path: 'categories/:id', element: <ProtectedRoute><CategoriesFiltered/></ProtectedRoute>},
      {path: 'brands', element: <ProtectedRoute><Brands/></ProtectedRoute>},
      {path: 'brands/:id', element: <ProtectedRoute><BrandsFiltered/></ProtectedRoute>},
      {path: 'wishlist', element: <ProtectedRoute><WishList/></ProtectedRoute>},
      {path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path: 'shippingAddress/:cardId', element: <ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      // {path: 'allorders', element: <ProtectedRoute><Orders/></ProtectedRoute>},
      {path: '*', element: <Notfound/>},
    ]}
  ])

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <ToastContainer />
            <Offline>
              <div className="fixed bottom-4 start-4 p-4 flex items-center bg-red-600 text-white rounded-md">
                <i className="fa-solid fa-wifi fa-fade"></i>
                <span className='ms-2'>You went offline!</span>
              </div>
            </Offline>
          </WishListContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
    </>
  )
}

export default App

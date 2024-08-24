import axios from 'axios';
import { Bounce, toast } from 'react-toastify';


export async function addProductToCart(id, setNumberOfCartItems){

    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
        productId: id
    }, {
        headers: {
            token: localStorage.getItem("token")
        }
    })

    setNumberOfCartItems(data.numOfCartItems);
    
    toast.success(data.message, {
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
  }
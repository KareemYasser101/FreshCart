import axios from 'axios';
import { Bounce, toast } from 'react-toastify';


export async function addProductToWishList(id){

    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {
        productId: id
    }, {
        headers: {
            token: localStorage.getItem("token")
        }
    })
    
    toast.success(data.message + "❤️", {
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


export async function getUserWishList(){
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
            token: localStorage.getItem("token")
        }
    })
    return data;
}


export async function removeProductFromWishList(id, setWishList){

    let {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + id,{
        headers: {
            token: localStorage.getItem("token")
        }
    })
    let wishListData = await getUserWishList();
    setWishList(wishListData.data);
    toast.success("Product removed successfully from your wishlist", {
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
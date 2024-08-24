import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';
import Product from '../Product/Product';
import NoProductsFound from '../NoProductsFound/NoProductsFound';

export default function BrandsFiltered() {
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getBrandProducts();
    window.scrollTo(0,0);
  }, []);

  async function getBrandProducts(){
    setIsLoading(true);
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products?brand=" + id)
    setProducts(data.data);
    setIsLoading(false);
  }

  return (
    isLoading ? <LoadingScreen/>
      :
      <>
        <Helmet>
          <title>Products</title>
        </Helmet>
        <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-5">
            {
             products.length !=0 
             ?
              products.map((product, index) => {
                return <Product product={product} key={index} />
              })
             :
              <NoProductsFound />
            }
        </div>
    </>
  )
}

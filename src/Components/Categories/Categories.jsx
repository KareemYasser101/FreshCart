import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Category from '../Category/Category';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useQuery } from '@tanstack/react-query';

export default function Categories() {

  function getCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, isLoading } = useQuery({
    queryKey:['categoreis'],
    queryFn:getCategories
  })

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);


  return (
    isLoading ? <LoadingScreen/>
    :
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div>
          <main className="my-8">
              <div className="container mx-auto">
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-y-4">
                      {
                          data?.data.data.map((category, index) => {
                            if(category.name != "Women's Fashion" && category.name != "Music" && category.name != "Beauty & Health")
                              return <Category key={index} category={category} />
                          })
                      }
                  </div>
              </div>
          </main>
      </div>
    </>
  )
}

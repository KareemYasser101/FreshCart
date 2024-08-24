import React from 'react'
import { Link } from 'react-router-dom'

export default function Category({ category }) {
  return (
    <div className="mx-3 col-span-1 h-64 rounded-md overflow-hidden bg-cover bg-center" style={{"background-image": `url(${category.image})`}}>
        <div className="bg-gray-900 bg-opacity-50 h-full flex justify-center items-center">
            <div className="px-10 max-w-xl flex flex-col items-center">
                <h2 className="text-2xl text-white font-semibold line-clamp-1">{category.name}</h2>
                <Link to={"/Categories/" + category._id}>
                  <button className="cursor-pointer flex items-center mt-4 px-2 py-1 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                      <span>Shop</span>
                      <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </button>
                </Link>
            </div>
        </div>
    </div>
  )
}

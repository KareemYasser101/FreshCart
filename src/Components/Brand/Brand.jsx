import React from 'react'
import { Link } from 'react-router-dom'

export default function Brand({ brand }) {
  return (
    <div
    className="col-span-1 w-full border border-blue-500 h-64 cursor-pointer overflow-hidden rounded-xl shadow-md transition-opacity hover:opacity-80"
    >
      <Link to={"/brands/" + brand._id}>
        <img
              alt="nature"
              className="h-full w-full object-contain object-center"
              src={brand.image}
          />
      </Link>
        
    </div>
  )
}

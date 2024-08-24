import React from 'react'

export default function NoProductsToShow() {
  return (
    <div className="h-[220px] flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
            <div className="text-5xl font-dark font-bold mb-5">🔎</div>
                <p className="text-2xl md:text-3xl font-light leading-normal">No products with this title</p>
                <p className="mb-8">But dont worry, you can find plenty of other things. Try again!</p>
            </div>
        </div>
    </div>
  )
}

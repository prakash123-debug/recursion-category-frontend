import React from 'react';
import productImage from '../component/images/lily-banse--YHSwy6uqvk-unsplash.jpg'

function Product({productDatas}) {
 
if(productDatas.length !== 0)
{
  return(
    <>
     {productDatas.map((product) => (
       <div key={product.id} className="group relative">
         <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
           <img
             src={productImage}
             alt={product.imageAlt}
             className="w-full h-full object-center object-cover lg:w-full lg:h-full"
           />
         </div>
         <div className="mt-4 flex justify-between">
           <div>
             <h3 className="text-sm text-gray-700">
               <a href="#">
                 <span aria-hidden="true" className="absolute inset-0" />
                 {product.name}
               </a>
             </h3>
             <p className="mt-1 text-sm text-gray-500">{product.slug}</p>
           </div>
           <p className="text-sm font-medium text-gray-900">Rs. {product.price}</p>
         </div>
       </div>
     ))}
    </>
   )

}
else{
  return(
    <h1 style={{alignItems:"center",justifyContent:"center"}} className='d-flex'>No products in this category</h1> 
  )
}

}

export default Product;





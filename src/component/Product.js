import React from 'react';
import Products from '../component/data/product.json'
import foodImage from '../component/images/lily-banse--YHSwy6uqvk-unsplash.jpg'

function Product({catId}) {
 
 const filteredProduct = Products.filter((product)=> product.categoryId == catId);

return(
    filteredProduct.map((data,index)=>{
        return(
            <div className="card h-100 shadow-sm mt-3">
       <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
   
         <img  src={foodImage} className="img-fluid" /> 
         <a href="#!">
           <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
         </a>
       </div>
       <div className="card-body">
         <h5 className="card-title">{data.name}</h5>
         <span style={{fontSize:"20px",color:"orange"}}>sub categories: {' '}</span>
                 <div className="buttonDiv">
         </div>
       </div>
     </div>
        )
    })
)
 
}

export default Product;





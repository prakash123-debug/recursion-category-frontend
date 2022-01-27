import React,{useState} from 'react';
import categoryData from './component/data/data.json'
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import foodImage from './component/images/lily-banse--YHSwy6uqvk-unsplash.jpg'
import Product from './component/Product'
import './App.css';

function App() {


  function listTemplate(data) {
    return(
      <div className='category-card'>
      <div className="card h-100 shadow-sm">
       <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
         {
           
         }
         <img  src={foodImage} className="img-fluid" /> 
         <a href="#!">
           <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
         </a>
       </div>
       <div className="card-body">
         <h5 className="card-title">{data.name}</h5>
         <span style={{fontSize:"20px",color:"orange"}}>sub categories: {' '}</span>
         {
                   data.child.length !==0? 
                     (
                      data.child.map((childData,index)=>{
                        return(
                         <span className="card-text">{childData.name} {'  '}</span>
                        )
                      })
                     ):<span>null</span>
                 }
                 <div className="buttonDiv">
         <button disabled={data.child.length ==0 ? true : false} className="btn btn-primary">Explore more category</button>
         </div>
       </div>
     </div>
     <div className="product-card" style={{marginTop:"80px"}}>
     <Product catId={data.id} />
     </div>
    </div>
     )

}
const fields = {
  id:"id",text:"name"
}
 
  return (
  <div className="container appStyle">
    
    <div className="row  mt-5">
       <ListViewComponent id="div" className="lists-style" dataSource={categoryData} template={listTemplate}  fields={fields} showHeader={true} headerTitle="Categories"/>
  </div>
  <div className="showText" style={{position:"absolute",top:"82vh"}}>
      <h3>Products:</h3>
    </div>
</div>


  );
}


export default App;



// <div className="m-auto">
    //   {
    //     categoryData.map((data,index)=>{
    //       return(
    //         <span>{data.name}</span>
    //       )
    //     })
    //   }
   
    // </div>

//     <div className="col-md-4">
//     <div className="card" >s
//   <div className="card-body">
//     <h5 className="card-title">Browse By Category</h5>
//     {
//         categoryData.map((data,index)=>{
//           return(
//             <div className="form-check">
//             <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" onClick={handleChange} value={data.id} />
//             <label className="form-check-label" for="exampleRadios1">
//             {data.name}
//             </label>
//           </div>
//           )
//         })
//       }
//   </div>
// </div>
// </div>
//   <div className="col-md-8">
//     <div className="row">
//       {
//         filteredCategory ? filteredCategory[0].child.map((data,index)=>{
//           return(
//             <div className="col-md-4">
//             <div className="card" style={{width:"18rem"}}>
//            <img src='./component/images/${data.image}' className="card-img-top" alt="..."/>
//            <div className="card-body">
//              <h5 className="card-title">{data.name}</h5>
//              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//            </div>
//            <div className="card-body">
//                <button className="btn btn-primary">Explore Products</button>
//            </div>
//           </div>
//                </div>
//           )
//         }):null
//       }
   
//     </div>

// </div>
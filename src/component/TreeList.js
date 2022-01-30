import React from "react";
import Tree from "./Tree";
import '../App.css'
const TreeList = ({categoryDatas,handleCategory,getAllProducts}) => {
  return (
    <>
      
  <div className=" overflow-hidden shadow-md mr-3">
      <div className="px-6">
        <div className="font-bold text-xl mb-2">Filter By Category</div>

        <div className=" treeData text-left text-gray-700 text-base">
            <h1 className=" font-semibold getallProductText m-3" onClick={(e)=>{getAllProducts(e)}}>Get All Products</h1>
                <Tree data={categoryDatas} handleCategory={handleCategory} />
              </div>
       </div>
      </div>
     
    
   
         
            {/* <div className=" mt-3">
              <div className=" treeData text-left text-dark">
                <Tree data={Category} />
              </div>
            </div> */}
        
    </>
  );
};

export default TreeList;
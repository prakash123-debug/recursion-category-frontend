import React,{useState} from 'react';
import TreeList from './component/TreeList'
import PriceRange from './component/PriceRange'
import productsData from './component/data/product.json'
import Product from './component/Product';
import Category from './component/data/data.json';

  export default function App() {
    const [minRange,setMinRange]= useState({
      min:0,max:1000
    });
  const [productDatas,setProductData]=useState(productsData);
  const [categoryDatas,setCategoryData]=useState(Category);

  function handleCategory(e){
   const {id} = e.target;
   const filteredProduct = productsData.filter((product)=> product.categoryId == id);
    setProductData(filteredProduct)
  }
  function getAllProducts(){
    setProductData(productsData)
  }
  function handleProductRange(value){
    const filteredProduct = productsData.filter((product)=> product.price >=value.min &&  product.price <=value.max);
    setProductData(filteredProduct);

  }
    return (
      <div>
        <div className="px-3 py-3">
          <h2 className="text-2xl text-center font-extrabold tracking-tight text-gray-900"> Products</h2>
        <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">
        <div className="mt-6 ">
          <div className="mb-5">
              <PriceRange minRange={minRange} setMinRange={setMinRange} handleProductRange={handleProductRange}/>
              </div>
              <TreeList categoryDatas = {categoryDatas} handleCategory={handleCategory} getAllProducts={getAllProducts}/>
          </div>

          <div className="mt-6 col-span-2 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            <Product productDatas = {productDatas} setProductData={setProductData}  />
          </div>
          </div>
        </div>
      </div>
    )
  }
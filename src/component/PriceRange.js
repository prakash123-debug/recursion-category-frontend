import React,{useState} from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import './ComponentStyle.css'
function PriceRange({minRange,setMinRange,handleProductRange}) {
  
return(
    <div className=" overflow-hidden shadow-md mr-3">
    <div className="px-10 py-6">
      <div className="font-bold text-xl mb-2">Filter By Price Range</div>

      <div className=" treeData text-left  text-base">
            <InputRange
            maxValue={1000}
            minValue={0}
            formatLabel={value => `Rs:${value}`}
            value={minRange}
            onChange={value => {setMinRange(value);}}
            onChangeComplete={value => handleProductRange(value)} />
            </div>
     </div>
    </div>

)
 
}

export default PriceRange;

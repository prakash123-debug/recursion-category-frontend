import React, { useState } from "react";
import foodImage from './images/lily-banse--YHSwy6uqvk-unsplash.jpg'
import { FaCaretRight } from "react-icons/fa";
import "../App.css";

const Tree = ({ data = [],handleCategory }) => {
  return (
    <div className="d-tree">
      <ul className="d-flex  d-tree-container flex-column">
        {data.map((tree) => (
          <TreeNode node={tree} handleCategory={handleCategory} />
        ))}
      </ul>
    </div>
  );
};

const TreeNode = ({ node,handleCategory }) => {
  const [childVisible, setChildVisiblity] = useState(false);
  const hasChild = node.child ? true : false;

  return (
    <li className="d-tree-node  inline-block mt-3  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      <div className="d-flex" onClick={(e) =>{ setChildVisiblity((v) => !v)}}>
        {hasChild && (
          <div
            className={`d-inline d-tree-toggler ${
              childVisible ? "active" : ""
            }`}
          >

           <FaCaretRight/>
          </div>
        )}

        <div className="col d-tree-head d-flex"  onClick={(e)=>handleCategory(e)} >
          {/* <img src={foodImage} style={{widht:"50px",height:"50px",marginLeft:"20px"}} alt="image foods"/> */}
          <span  id={node.id} style={{fontSize:"20px",marginLeft:"10px"}}>{node.name}</span>
        </div>
      </div>

      {hasChild && childVisible && (
        <div className="d-tree-content">
          <ul className="d-flex d-tree-container flex-column">
            <Tree data={node.child} handleCategory={handleCategory} />
          </ul>
        </div>
      )}
    </li>
  );
};

export default Tree;
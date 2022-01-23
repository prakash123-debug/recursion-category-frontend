
import React from 'react';
import { baseLink } from "../../../Helpers/Axios";
function Node({node,children}) {
  let childnodes = null;

  if(children) {
    childnodes = children.map(function(childnode) {
     return (
       <Node node={childnode} children={childnode.children} />
     );
   });
  }

  return (
    <>
    <tr className="bg-primary">
      <td>category</td>
      <td>image</td>
     
    </tr>
    <tr  className="bg-success">
      <td><span>{node.name}</span>
      { childnodes ?
        <ul >{childnodes}</ul>
      : null }
      </td>
      <td>
      <img
        className="imagePreviewTable ml-5"
        src={`${baseLink}${node.image}`}
        alt="imagepreview"
     />
      </td>
    </tr>

    </>

    
  );
}

export default Node;
// <div className="col-md-12" key={node.id}>
    //   <span>{node.name} </span>
    //   <img
    //     className="imagePreviewTable ml-5"
    //     src={`${baseLink}${node.image}`}
    //     alt="imagepreview"
    //  />
     
    //   <hr/>
    //   { childnodes ?
    //     <ul >{childnodes}</ul>
    //   : null }
    // </div>

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

  const handleClick = (nodeDatas)=>{
    console.log(nodeDatas)

  }

  return (
    <>
     <div className="col-md-4">
              <div className="card">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img  src={`${baseLink}${node.image}`} className="img-fluid" />
                  <a href="#!">
                    <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{node.name}</h5>
                  <span>sub category:</span>
                  {
                   node.children.length !==0? 
                     (
                      node.children.map((childData,index)=>{
                        return(
                         <span className="card-text">{childData.name} {' '}</span>
                        )
   
                      })

                     ):<span>null</span>
                 
                 }

                  {/* { childnodes ?
                    <div>{childnodes}</div>
                  : null } */}
                  <a href="#!" className="btn btn-primary" onClick={handleClick({childnodes})}>Explore more Categories</a>
                </div>
              </div>
            </div>
            {childnodes}
 

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
      // { childnodes ?
      //   <ul >{childnodes}</ul>
      // : null }
    // </div>


    //   <tr className="bg-primary">
    //   <td>category</td>
    //   <td>image</td>
     
    // </tr>
    // <tr  className="bg-success">
    //   <td><span>{node.name}</span>
    //   { childnodes ?
    //     <ul >{childnodes}</ul>
    //   : null }
    //   </td>
    //   <td>
    //   <img
    //     className="imagePreviewTable ml-5"
    //     src={`${baseLink}${node.image}`}
    //     alt="imagepreview"
    //  />
    //   </td>
    // </tr> 


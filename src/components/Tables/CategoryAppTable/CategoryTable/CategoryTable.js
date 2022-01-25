import React, { useEffect, useState } from 'react';
import { Row, Table } from "react-bootstrap";
import { baseLink } from "../../../Helpers/Axios";
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import Node from './Node';
import '../CategoryStyle.css'
import axiosInstance from "../../../Helpers/Axios";
const CategoryTable = ({ show }) => {
  const [items, SetItems] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/category", {
        headers: {
          "Content-Type": "application/json"

        },
      })
      .then((res) => {
        console.log("data shown is",res.data.data);
        SetItems(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [show]);
  const fields = {
    id:"id",text:"name"
  }

  function listTemplate(data) {
             return( <div className="card h-100 shadow-sm">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img  src={`${baseLink}${data.image}`} className="img-fluid" />
                  <a href="#!">
                    <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{data.name}</h5>
                  <span>sub category:</span>
                 {
                   data.child.length !==0? 
                     (
                      data.child.map((childData,index)=>{
                        return(
                         <span className="card-text">{childData.name} {' '}</span>
                        )
                      })
                     ):<span>null</span>
                 }
                  <button disabled={data.child.length ==0 ? true : false} className="btn btn-primary">Explore more category</button>
                </div>
              </div>)

    // return (<div className='container'>
    //   {letterAvatar}
    //     <span className="e-list-item-header">{data.name}</span>
    // </div>);
}

  // let nodes = items.map(function (data) {
  //   return (
  //     <Node node={data} children={data.children} />
  //   );
  // });

  return (
    <div className="BreadcrumbStyle BreadcrumbTitle row mt-3">
      <ListViewComponent id="div" className="lists-style" dataSource={items} template={listTemplate}  fields={fields} showHeader={true} headerTitle="Categories"/>
   </div>
  )
   
}

export default CategoryTable;

    // <div className="container">
    //       <Row className="BreadcrumbStyle mt-4">
      //       {nodes}
      //   </Row>
      // </div>
       // <div className="container mt-5">
    //   <div className="row">
    //     {console.log("nodes",nodes)}
    //     {nodes}
      
        // {/* {
        //   items.map((data, index) => {
        //     return(
        //       <div className="col-md-4">
        //       <div className="card">
        //         <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
        //           <img  src={`${baseLink}${data.image}`} className="img-fluid" />
        //           <a href="#!">
        //             <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
        //           </a>
        //         </div>
        //         <div className="card-body">
        //           <h5 className="card-title">{data.name}</h5>
        //           <span>sub category:</span>
        //          {
        //            data.children.length !==0? 
        //              (
        //               data.children.map((childData,index)=>{
        //                 return(
        //                  <span className="card-text">{childData.name} {' '}</span>
        //                 )
   
        //               })

        //              ):<span>null</span>
                 
        //          }
        //           <a href="#!" className="btn btn-primary">Explore more Categories</a>
        //         </div>
        //       </div>
        //     </div>
        //     )
        //   })
        // }
        
    //   </div>
    // </div>

    //     <div className="BreadcrumbStyle mt-4">
    // <Table className="table table-bordered w-100">
    //        {nodes}
    // </Table>
    // </div>
  // );
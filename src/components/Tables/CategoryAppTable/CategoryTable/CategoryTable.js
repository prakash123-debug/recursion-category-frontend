

import React, { useEffect,useState } from 'react';
import { Row, Table } from "react-bootstrap";

import Node from './Node';
import axiosInstance from "../../../Helpers/Axios";
const CategoryTable = ({show}) => {

    const [items,SetItems] = useState([]);
    useEffect(() => {
      axiosInstance
        .get("/category", {
          headers: {
            "Content-Type": "application/json"
          
          },
        })
        .then((res) => {
          SetItems(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },[show]);


    let nodes = items.map(function(data) {
      return (
        <Node node={data} children={data.children} />
      );
    });

    return (
    
          <div className="BreadcrumbStyle mt-4">
      <Table className="table table-bordered w-100">
             {nodes}
      </Table>
      </div>
    );
}

export default CategoryTable;

    // <div className="container">
    //       <Row className="BreadcrumbStyle mt-4">
      //       {nodes}
      //   </Row>
      // </div>
import React, { useState } from "react";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import { Row, Col, Button } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import CategoryTable from "../../../Tables/TourismAppTable/CategoryTable/CategoryTable";
import CategoryModal from "../../../Modals/TourismAppModal/CategoryModal/CategoryModal";
import { useContextSelector } from "use-context-selector";
import ChangeImage from "../../../../ChangeImage";

const Category = () => {
  const crumbs = ["Home", "Categories", "category"];
  const [shows, handleShow] = useState(false);
  const closeModalHandler = () => handleShow(false);

  return (
    <>
      <Row className="BreadcrumbStyle BreadcrumbTitle">
        <Col md="12">
          <Col md="10" className="float-left">
            <Breadcrumb crumbs={crumbs}></Breadcrumb>
          </Col>
          <Col md="2" className="float-right mt-2">
              <Button
                className="float-right ProductButton"
                onClick={() => {
                  handleShow(true);
                }}
              >
                <BsFillPlusCircleFill />
              </Button>
          </Col>
        </Col>
      </Row>

      <CategoryTable show={shows} />
      <CategoryModal shows={shows} close={closeModalHandler} />
    </>
  );
};
export default Category;

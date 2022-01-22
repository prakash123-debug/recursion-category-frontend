import React, {useState} from 'react';
import Breadcrumb from '../../../BreadCrumb/Breadcrumb';
import {Row, Col, Button} from 'react-bootstrap';
import {BsFillPlusCircleFill} from 'react-icons/bs';
import SubCategoryTable from '../../../Tables/TourismAppTable/SubCategoryTable/SubCategoryTable';
import SubCategoryModal from '../../../Modals/TourismAppModal/SubCategoryModal/SubCategoryModal';
import { useContextSelector } from 'use-context-selector';
import ChangeImage from '../../../../ChangeImage';

const SubCategory = () => {
  const crumbs = ['Home', 'TourismApp', 'SubCategory'];
  const subCategoryResources = useContextSelector(ChangeImage, (context) => {
    return context.subCategoryResources;
  })
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
            {
                subCategoryResources.canAdd === true ? 
                (
                  <Button
                  className="float-right ProductButton"
                  onClick={() => {
                    handleShow(true);
                  }}
                >
                  <BsFillPlusCircleFill />
                </Button>
                ) : null
            }
           
          </Col>
        </Col>
      </Row>

      <SubCategoryTable show={shows} />
      <SubCategoryModal shows={shows} close={closeModalHandler} />
    </>
  );
};
export default SubCategory;

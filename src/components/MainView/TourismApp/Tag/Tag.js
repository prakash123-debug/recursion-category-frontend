import React, {useState} from 'react';
import Breadcrumb from '../../../BreadCrumb/Breadcrumb';
import {Row, Col, Button} from 'react-bootstrap';
import {BsFillPlusCircleFill} from 'react-icons/bs';
import TagTable from '../../../Tables/TourismAppTable/TagTable/TagTable';
import TagModal from '../../../Modals/TourismAppModal/TagModal/TagModal';
import { useContextSelector } from 'use-context-selector';
import ChangeImage from '../../../../ChangeImage';

const Tag = () => {
  const crumbs = ['Home', 'Tags'];
  const TagResources = useContextSelector(ChangeImage, (context) => {
    return context.TagResources;
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
              TagResources.canAdd === true ? (
                <Button
                className="float-right ProductButton"
                onClick={() => {
                  handleShow(true);
                }}
              >
                <BsFillPlusCircleFill />
              </Button>
              ):null
            }
          
          </Col>
        </Col>
      </Row>

      <TagTable show={shows} />
      <TagModal shows={shows} close={closeModalHandler} />
    </>
  );
};
export default Tag;

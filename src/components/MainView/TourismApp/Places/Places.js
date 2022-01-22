import React from 'react';
import Breadcrumb from '../../../BreadCrumb/Breadcrumb';
import {Row, Col, Button} from 'react-bootstrap';
import {BsFillPlusCircleFill} from 'react-icons/bs';
import PlacesTable from '../../../Tables/TourismAppTable/PlaceTable/PlacesTable';
import {Link} from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import ChangeImage from '../../../../ChangeImage';

const Places = () => {
  const crumbs = ['Home', 'TourismApp', 'Places'];
  const PlacesResources = useContextSelector(ChangeImage, (context) => {
    return context.PlacesResources;
  })
  return (
    <>
      <Row className="BreadcrumbStyle BreadcrumbTitle">
        <Col md="12">
          <Col md="10" className="float-left">
            <Breadcrumb crumbs={crumbs}></Breadcrumb>
          </Col>
          <Col md="2" className="float-right mt-2">
            {
              PlacesResources.canAdd === true ? (
            <Link to="/dashboard/tourismApp/places/addPlace">
              <Button className="float-right ProductButton">
                <BsFillPlusCircleFill />
              </Button>
            </Link>
              ):null
            }
            
          </Col>
        </Col>
      </Row>

      <PlacesTable/>
    </>
  );
};
export default Places;

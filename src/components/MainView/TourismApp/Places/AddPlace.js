import React, { useState, useEffect } from "react";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import {
  BsListUl,
  BsFillPlusCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";
import "./PlaceStyle.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaLocationArrow,
  FaTags,
} from "react-icons/fa";
import { Col, Button, ButtonGroup, Row, Table } from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../Helpers/Axios";
import "./PlaceStyle.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
const Validate = Yup.object().shape({
  categoryId: Yup.string().required("Required"),
  subCategoryId: Yup.string().required("Required"),
  placeName: Yup.string().max(70, "Too Long!").required("Required"),
  longitude: Yup.string().required("Required"),
  latitude: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  email: Yup.string().email("must be in email format").required("Required"),
});
const AddPlace = () => {
  const { push } = useHistory();
  const access_token = localStorage.token;

  const [btnDisable, SetbtnDisabled] = useState(false);
  const [notification, notificationError] = useState("");
  const [categoryItems, SetCategoryItems] = useState([]);
  const [SubCategoryItems, SetSubCategoryItems] = useState([]);
  const [TagItems, SetTagItems] = useState([]);
  const [catId, SetCatId] = useState("");
  const [ckEditorData, setckEditorData] = useState("");
  const [imageData, setImageData] = useState([]);
  const [TagsData, SetTagsData] = useState([]);
  const [TagId, SetTagId] = useState([]);
  const [backendError, setBackendError] = useState("");
  const [backendErrorData, setBackendErrorData] = useState("");
  const [landLineNumbers, setlandLineNumbers] = useState([
    { landlineNumber: "" },
  ]);
  const crumbs = ["Home", "TourismApp", "Places", "AddPlace"];

  useEffect(() => {
    axiosInstance
      .get("/dashboard/category", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${access_token}`,
        },
      })
      .then((res) => {
        SetCategoryItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axiosInstance
      .get("/dashboard/subcategory", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${access_token}`,
        },
      })
      .then((res) => {
        SetSubCategoryItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axiosInstance
      .get("/dashboard/tag", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${access_token}`,
        },
      })
      .then((res) => {
        res.data.map((index, i) => {
          SetTagsData((oldArray) => [
            ...oldArray,
            {
              value: `${index.id}`,
              label: `${index.tagName}`,
            },
          ]);
          return null;
        });

        SetTagItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [access_token]);

  const selectChange = (e) => {
    SetCatId(e.target.value);
  };

  const handleInputChangeDynamic = (e, index) => {
    const { name, value } = e.target;
    const list = [...landLineNumbers];
    list[index][name] = value;
    setlandLineNumbers(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...landLineNumbers];
    list.splice(index, 1);
    setlandLineNumbers(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setlandLineNumbers([...landLineNumbers, { landlineNumber: "" }]);
  };

  const onImageChange = (event, setFieldValue) => {
    setImageData([null]);
    const fileName = event.target.files;
    setFieldValue("placePhotos", event.target.files);
    Array.from(fileName).forEach((file) => {
      setImageData((previousValue) => {
        var fileurl = URL.createObjectURL(file);

        return [...previousValue, fileurl];
      });
    });
  };

  const onTagChange = (event, setFieldValue) => {
    event.map((index, i) => {
      SetTagId((oldArray) => [...oldArray, `${index.value}`]);
      return null;
    });
  };

  return (
    <>
      {backendError ? (
        <div className="alert w-40 alert-danger alert-dismissible">
          <strong>Error!</strong> {`${backendErrorData}`}
          <button
            type="button"
            onClick={() => {
              setBackendError(false);
            }}
            className="close"
            data-dismiss="alert"
          >
            &times;
          </button>
        </div>
      ) : null}
      {notification ? (
        <div className="alert w-40 alert-success alert-dismissible">
          <strong>success!</strong>Place Created Sucessfully
          <button
            type="button"
            onClick={() => {
              notificationError(false);
            }}
            className="close"
            data-dismiss="alert"
          >
            &times;
          </button>
        </div>
      ) : null}
      <Row className="BreadcrumbStyle BreadcrumbTitle">
        <Col md="12">
          <Col md="10" className="float-left">
            <Breadcrumb crumbs={crumbs}></Breadcrumb>
          </Col>
          <Col md="2" className="float-right mt-2"></Col>
        </Col>
      </Row>
      <div className="container-lg BreadcrumbStyle  mt-4">
        <Formik
          initialValues={{
            categoryId: "",
            subCategoryId: "",
            email: "",
            phoneNumber: "",
            description: "",
            latitude: "",
            longitude: "",
            placeName: "",
            placePhotos: [],
            tagId: [],
          }}
          validationSchema={Validate}
          onSubmit={async (values, actions) => {
            const uniqueArray = TagId.filter(function (item, pos, self) {
              return self.indexOf(item) === pos;
            });
            let landlineDatas = "";
            landLineNumbers.map((data, index) => {
              if (!data.landlineNumber == "") {
                landlineDatas = landlineDatas + "," + data.landlineNumber;
              }
            });
            let landlineNumbersString = landlineDatas.substring(1);
            console.log("landlineNumbersString", landlineNumbersString);

            let formdata = new FormData();
            formdata.append("categoryId", values.categoryId);
            formdata.append("email", values.email);
            formdata.append("mobileNumber", values.phoneNumber);
            formdata.append("subCategoryId", values.subCategoryId);
            formdata.append("description", ckEditorData);
            formdata.append("latitude", values.latitude);
            formdata.append("longitude", values.longitude);
            formdata.append("placeName", values.placeName);
            formdata.append("tags", JSON.stringify(uniqueArray));
            formdata.append("landlineNumber", landlineNumbersString);
            const placePicture = values.placePhotos;
            Array.from(placePicture).forEach((file) => {
              formdata.append("placePhotos", file);
            });

            await axiosInstance
              .post("/dashboard/place", formdata, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `token ${access_token}`,
                },
              })
              .then((res) => {
                setImageData([null]);
                setckEditorData("");
                SetbtnDisabled(true);
                notificationError(true);
                push("/dashboard/tourismApp/places");
              })
              .catch((error) => {
                if (error.response.status === 422) {
                  setBackendError(true);
                  setBackendErrorData(error.response.data.errors[0].msg);
                }
              });
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} encType="multipart/form-data">
              <div className="row">
                <div className="block-content col-md-6">
                  <div className="form-group">
                    <label htmlFor="w-10">Select Category </label>
                    <sup className="text-danger">*</sup>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <BsListUl />
                        </span>
                      </div>
                      <select
                        className="form-control"
                        name="categoryId"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.categoryId}
                        autoComplete="off"
                        onClick={selectChange}
                      >
                        <option>Select Category</option>
                        {categoryItems.map((index, i) => {
                          return (
                            <option key={i} value={index.id}>
                              {index.categoryName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <span className="error">
                    <ErrorMessage name="categoryId" />
                  </span>
                </div>

                <div className="block-content col-md-6">
                  <div className="form-group">
                    <label htmlFor="w-10">Select SubCategory </label>
                    <sup className="text-danger">*</sup>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <BsListUl />
                        </span>
                      </div>
                      <select
                        className="form-control"
                        name="subCategoryId"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.subCategoryId}
                        autoComplete="off"
                      >
                        <option>Select SubCategory</option>
                        {SubCategoryItems.map((index, i) => {
                          if (index.categoryId == catId) {
                            return (
                              <option key={i} value={index.id}>
                                {index.subCategoryName}
                              </option>
                            );
                          } else {
                            return <p>NO data Found</p>;
                          }
                        })}
                      </select>
                    </div>
                  </div>
                  <span className="error">
                    <ErrorMessage name="subCategoryId" />
                  </span>
                </div>
                <div className="block-content col-md-6">
                  <div className="form-group">
                    <label htmlFor="w-10">Place Name</label>
                    <sup className="text-danger">*</sup>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FaLocationArrow />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="placeName"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.placeName || ""}
                        autoComplete="off"
                        placeholder="Please enter Place name"
                      />
                    </div>
                  </div>
                  <span className="error">
                    <ErrorMessage name="placeName" />
                  </span>
                </div>

                <div className="block-content col-md-6">
                  <div className="form-group">
                    <label htmlFor="w-10">Mobile Number</label>
                    <sup className="text-danger">*</sup>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FaPhoneAlt />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.phoneNumber || ""}
                        autoComplete="off"
                        placeholder="Please enter Phone Number"
                      />
                    </div>
                  </div>
                  <span className="error">
                    <ErrorMessage name="phoneNumber" />
                  </span>
                </div>
                <div className="block-content col-md-6">
                  <div className="form-group">
                    <label htmlFor="w-10">Email</label>
                    <sup className="text-danger">*</sup>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FaEnvelope />
                        </span>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.email || ""}
                        autoComplete="off"
                        placeholder="Please enter email"
                      />
                    </div>
                  </div>
                  <span className="error">
                    <ErrorMessage name="email" />
                  </span>
                </div>

                <div className="block-content col-md-6">
                  <div className="form-group">
                    <label htmlFor="w-10">Latitude</label>
                    <sup className="text-danger">*</sup>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FaMapMarkerAlt />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="latitude"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.latitude || ""}
                        autoComplete="off"
                        placeholder="Please enter latitude"
                      />
                    </div>
                  </div>
                  <span className="error">
                    <ErrorMessage name="latitude" />
                  </span>
                </div>
                <div className="block-content col-md-6">
                  <div className="form-group">
                    <label htmlFor="w-10">Longitude</label>
                    <sup className="text-danger">*</sup>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FaMapMarkerAlt />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="longitude"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.longitude || ""}
                        autoComplete="off"
                        placeholder="Please enter longitude"
                      />
                    </div>
                  </div>
                  <span className="error">
                    <ErrorMessage name="longitude" />
                  </span>
                </div>
                <div className="block-content col-md-6">
                  <div className="form-group">
                    <label htmlFor="w-10">Select Tags </label>
                    <sup className="text-danger">*</sup>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FaTags />
                        </span>
                      </div>
                      <div style={{ width: "88%" }}>
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          name="tagId"
                          onBlur={props.handleBlur}
                          onChange={(event) =>
                            onTagChange(event, props.setFieldValue)
                          }
                          isMulti
                          options={TagsData}
                        />
                      </div>
                    </div>
                  </div>
                  <span className="error">
                    <ErrorMessage name="tagId" />
                  </span>
                </div>

                <div className="block-content col-md-12 mt-2 mb-2">
                  <Table size="sm" bordered hover>
                    <thead>
                      <tr>
                        <td>S.N</td>
                        <td>Landline Numbers:</td>
                        <td>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {landLineNumbers.map((x, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="landlineNumber"
                                min="0"
                                placeholder="eg - 070000000"
                                value={x.landlineNumber}
                                onChange={(e) => handleInputChangeDynamic(e, i)}
                              />
                            </td>

                            <td>
                              <div className="btn-box">
                                {landLineNumbers.length !== 1 && (
                                  <Button
                                    className="btn btn-danger m-1"
                                    onClick={() => handleRemoveClick(i)}
                                  >
                                    <BsFillTrashFill />
                                  </Button>
                                )}
                                {landLineNumbers.length - 1 === i && (
                                  <Button
                                    className="btn btn-default m-1"
                                    onClick={handleAddClick}
                                  >
                                    <BsFillPlusCircleFill />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>

                <div className="block-content col-md-6">
                  <div className="form-group">
                    <label htmlFor="w-10">Select placePhotos</label>
                    <sup className="text-danger"></sup>
                    <div className="input-group">
                      <input
                        type="file"
                        name="placePhotos"
                        onChange={(event) =>
                          onImageChange(event, props.setFieldValue)
                        }
                        onBlur={props.handleBlur}
                        multiple
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <span className="error">
                    <ErrorMessage name="placePhotos" />
                  </span>
                </div>

                {imageData.map((images, i) => {
                  if (images) {
                    return (
                      <img
                        className="imagePreview"
                        src={images}
                        alt="PlaceImages"
                      />
                    );
                  } else return null;
                })}
              </div>

              <label for="wizard-validation-classic-bio">Description</label>
              <CKEditor
                style={{ height: "200px" }}
                editor={ClassicEditor}
                data={ckEditorData}
                onChange={(event, editor) => {
                  const datas = editor.getData();
                  setckEditorData(datas);
                }}
              />
              <div className="col-md-12">
                <Link to="/dashboard/tourismApp/places">
                  <Button className="m-3" variant="secondary">
                    Back
                  </Button>
                </Link>
                <Button type="submit" disabled={btnDisable} variant="primary">
                  Submit
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};
export default AddPlace;

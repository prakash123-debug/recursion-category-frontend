import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axiosInstance from "../../../Helpers/Axios";
import { baseLink } from "../../../Helpers/Axios";
import { BsListUl } from "react-icons/bs";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const Validate = Yup.object().shape({
  category_name: Yup.string()
    .min(5, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
});
const EditCategoryModal = ({ shows, close, ModalData }) => {
  const [AllDataItem, SetAllItem] = useState({});
  const [notification, setNotification] = useState(false);
  const [btnDisable, SetbtnDisabled] = useState(false);
  const access_token = localStorage.token;
  const [imageData, setImageData] = useState(null);
  const [imageshowing, Setimageshowing] = useState(true);
  const [backendError, setBackendError] = useState("");

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(false);
      }, 600);
    }
    if (backendError) {
      setTimeout(() => {
        setBackendError(false);
      }, 1500);
    }
  }, [notification, backendError]);

  useEffect(() => {
    SetAllItem(ModalData);
  }, [ModalData]);

  const onImageChange = (event, setFieldValue) => {
    setFieldValue("categoryImage", event.target.files[0]);
    Setimageshowing(false);
    setImageData(URL.createObjectURL(event.target.files[0]));
  };

  if (AllDataItem) {
    return (
      <>
        <Formik
          initialValues={{
            category_name: AllDataItem.categoryName,
            categoryImage: AllDataItem.categoryImage,
          }}
          validationSchema={Validate}
          enableReinitialize={true}
          onSubmit={async (values, actions) => {
            let formdata = new FormData();
            formdata.append("categoryName", values.category_name);
            formdata.append("categoryImage", values.categoryImage);
            SetbtnDisabled(true);
            await axiosInstance
              .patch(`/dashboard/category/${AllDataItem.id}`, formdata, {
                headers: {
                  Authorization: `token ${access_token}`,
                },
              })
              .then((res) => {
                Setimageshowing(false);
                SetbtnDisabled(false);
                setNotification(true);
                setTimeout(() => close(), 500);
              })
              .catch((error) => {
                if (error.response) {
                  if (error.response.status === 409) {
                    setBackendError(true);
                  } else if (error.response.status === 500) {
                    setBackendError(true);
                  }
                } else if (error.request) {
                  
                  console.log(error.request);
                } else {
                  console.log("Error", error.message);
                }
                SetbtnDisabled(false);
              });
          }}
        >
          {(props) => (
            <Modal
              show={shows}
              onHide={close}
              backdrop="static"
              keyboard={false}
              visible={true}
            >
              {backendError ? (
                <div className="alert w-40 alert-danger alert-dismissible">
                  <strong>Error!</strong> Duplicate entry of category name
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
                <div className="m-0 alert w-40 alert-success alert-dismissible">
                  <strong>success!</strong> Data Updated Sucessfully
                </div>
              ) : (
                <form onSubmit={props.handleSubmit}>
                  <Modal.Header>
                    <Modal.Title>Category</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="block-content">
                      <div className="form-group">
                        <label htmlFor="w-10">Category Name</label>
                        <sup className="text-danger">*</sup>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <BsListUl />
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            name="category_name"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            initialValue={AllDataItem.categoryName}
                            value={props.values.category_name}
                            autoComplete="off"
                            placeholder="Please enter category name"
                          />
                        </div>
                      </div>
                    </div>
                    <span className="error">
                      <ErrorMessage name="category_name" />
                    </span>
                    <div className="block-content">
                      <div className="form-group">
                        <label htmlFor="w-10">Select Category Image</label>
                        <sup className="text-danger">*</sup>
                        <div className="input-group">
                          <input
                            type="file"
                            name="categoryImage"
                            onChange={(event) =>
                              onImageChange(event, props.setFieldValue)
                            }
                            onBlur={props.handleBlur}
                            multiple
                            autoComplete="off"
                            placeholder="Please enter category name"
                          />
                        </div>
                        {AllDataItem.categoryImage ? (
                          <img
                            className={
                              imageshowing
                                ? "imagePreviewsShow"
                                : "imagePreviewsHide"
                            }
                            src={`${baseLink}${AllDataItem.categoryImage}`}
                            alt="categoryImage"
                          />
                        ) : null}

                        {imageData ? (
                          <img
                            className="imagePreviewsShow"
                            src={imageData}
                            alt="categoryImage"
                          />
                        ) : null}
                      </div>
                      <span className="error">
                        <ErrorMessage name="categoryImage" />
                      </span>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      disabled={btnDisable}
                      variant="primary"
                    >
                      Submit
                    </Button>
                  </Modal.Footer>
                </form>
              )}
            </Modal>
          )}
        </Formik>
      </>
    );
  }

  return <></>;
};

export default EditCategoryModal;

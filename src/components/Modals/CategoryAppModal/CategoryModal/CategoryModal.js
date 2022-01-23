import React, {useState, useEffect,useCallback} from 'react';
import {Button, Modal} from 'react-bootstrap';
import axiosInstance from '../../../Helpers/Axios';
import {BsListUl} from 'react-icons/bs';
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  category_name: Yup.string()
    .max(70, 'Too Long!')
    .required('Required'),
    category_slug: Yup.string()
    .max(70, 'Too Long!')
    .required('Required'),
});

const CategoryModal = ({shows, close}) => {
  const access_token = localStorage.token;
  const [notification, setNotification] = useState('');
  const [backendError, setBackendError] = useState('');
   const [categoryItems, SetCategoryItems] = useState([])
  const [imageData, setImageData] = useState(null);
  const [catId, SetCatId] = useState("");
  useEffect(() => {
    if (notification) {
     setTimeout(() => {
        setNotification(false);
      }, 700);
    }
    if (backendError) {
     setTimeout(() => {
        setBackendError(false);
      }, 700);
    }
    fetchingCategory();
  }, [notification, backendError,shows]);

  const onImageChange = (event, setFieldValue) => {
    setFieldValue('categoryImage', event.target.files[0]);
    setImageData(URL.createObjectURL(event.target.files[0]));
  };
  function selectChange(e) {
    SetCatId(e.target.value);
  }
  const fetchingCategory = useCallback(async () => {
    axiosInstance
      .get('/category/allCategory', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${access_token}`,
        },
      })
      .then((res) => {
        SetCategoryItems(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <Formik
        initialValues={{
          category_name: '',
          categoryImage: null,
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          var parentId = values.parentCategory ? values.parentCategory : '';
          console.log("ALl values are",values,"parentId",parentId);
          let formdata = new FormData();
          formdata.append('name', values.category_name);
          formdata.append('slug', values.category_slug);
          formdata.append('parentId',parentId);
          formdata.append('image', values.categoryImage);
          await axiosInstance
            .post('/category', formdata, {
              headers: {
                Authorization: `token ${access_token}`,
              },
            })
            .then((res) => {
              setImageData('');
              setNotification(true);
                setTimeout(() => close(), 500);

            })
            .catch((error) => {
              if (error.response.status === 409) {
                setBackendError(true);
              }
            });
              actions.resetForm();

        }}
      >
        {(props) => (
          <Modal show={shows} onHide={close} backdrop="static" keyboard={false}>
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
            <strong>success!</strong> Data Created Sucessfully
            </div>
            ) : 
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
                    <label htmlFor="w-10">Category Slug</label>
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
                        name="category_slug"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.category_slug}
                        autoComplete="off"
                        placeholder="Please enter category slug"
                      />
                    </div>
                  </div>
                </div>
                <span className="error">
                  <ErrorMessage name="category_slug" />
                </span>
                <div className="block-content">
                  <div className="form-group">
                    <label htmlFor="w-10">Parent Category</label>
                    <sup className="text-danger">*</sup>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <BsListUl />
                        </span>
                      </div>
                      <select
                        className="form-control"
                        name="parentCategory"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.parentCategory}
                        autoComplete="off"
                        onClick={selectChange}
                      >
                        <option>No Parent Category</option>
                        {categoryItems.map((index, i) => {
                          return (
                            <option key={i} value={index.id}>
                              {index.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <span className="error">
                  <ErrorMessage name="parent_category" />
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
                    {
                      imageData ? <img className="imagePreview" src={imageData} alt="categoryImage" /> : null
                    }
                    
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
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Modal.Footer>
            </form>
          }
          </Modal>
        )}
      </Formik>
    </>
  );
};

export default CategoryModal;

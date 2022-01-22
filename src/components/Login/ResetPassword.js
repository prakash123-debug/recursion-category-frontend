import React, { useState, useEffect } from 'react';
import './LoginStyle.css';
import { FaKey } from 'react-icons/fa';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../Helpers/Axios';
import { Link, useParams } from 'react-router-dom';
import { Spinner, Carousel } from 'react-bootstrap';

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = 'Password field is required';
  }
  if (!values.confirmPwd) {
    errors.confirmPwd = 'Confirm password field is required';
  } else if (!values.confirmPwd === values.password) {
    errors.confirmPwd = 'Password didnot match';
  }

  return errors;
};

const ResetPassword = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const { push } = useHistory();
  const [notification, setNotification] = useState(false);
  const [BackendError, setBackendError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const { token } = useParams();

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setBackendError(false);
      }, 500);
    }
  }, [BackendError]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPwd: '',
    },
    validate,

    onSubmit: (values) => {
      setLoading(true);
      const data = {
        password: values.password,
        confirmPassword: values.confirmPwd,

      };
      axiosInstance
        .post(`/dashboard/user/reset/${token}`, data)
        .then((res) => {
          setBackendError('');
          setLoading(false);
          setNotification(true);
          if (res.status === 200) {
            setResult(res.data.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 422) {
            setBackendError("A password must be of at least 8 character with Special character");
          }
          else if (error.response.status === 400) {
            setBackendError(error.response.data.message);
          }
        });
    },
  });

  return (
    <>
      <section className="login-block">
        <div className="container containers ">
          <div className="row">
            <div className="col-md-4 login-sec">
              <h2 className="text-center">{result ? "Congratulation!!" : "Create New Password"}</h2>

              <form className="login-form" onSubmit={formik.handleSubmit}>
                {BackendError ? (
                  <p className="error  text-center">{BackendError}</p>
                ) : null}

                {
                  result ? (<p class="text-success text-center">{result}  <Link to='/'>Login</Link></p>) :

                    (


                      <div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                          <input type="password"
                            autoComplete="off"
                            name="password"
                            className="form-control"
                            placeholder="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password} />
                          {formik.touched.password && formik.errors.password ? (
                            <small className="error">{formik.errors.password}</small>
                          ) : null}

                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1" className="text-uppercase">Confirm Password</label>
                          <input type="password"
                            autoComplete="off"
                            name="confirmPwd"
                            className="form-control"
                            placeholder="confirm password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPwd} />
                          {formik.touched.confirmPwd && formik.errors.confirmPwd ? (
                            <small className="error">{formik.errors.confirmPwd}</small>
                          ) : null}

                        </div>



                        <div className="form-check">
                          {loading ? (
                            <Spinner className="float-right" animation="border" role="status">
                            </Spinner>
                          ) : (<button type="submit" className="btn btn-login float-right">Submit</button>)
                          }


                        </div>

                      </div>
                    )
                }






              </form>
            </div>
            <div className="col-md-8 banner-sec">
            <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/Lumbinifinal.png"
          alt="First slide"
        />
     
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="/images/LumbinComplain.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Chat Application</h3>
          <p>
            Directly Chat With Authorized People
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/desktop.png"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Complains from user</h3>
          <p>Directly Complain To Authorized People</p>
        </Carousel.Caption>
      </Carousel.Item>
    
    </Carousel>
            </div>
          </div>
        </div>
      </section>


    </>
  );
};
export default ResetPassword;

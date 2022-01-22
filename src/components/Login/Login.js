import React, { useState, useEffect } from 'react';
import './LoginStyle.css'
import { FaUserAlt, FaKey } from "react-icons/fa";
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";
import axiosInstance from "../Helpers/Axios";
import { Link } from 'react-router-dom';
import { Spinner,Carousel } from 'react-bootstrap';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email field is required';
  }

  if (!values.password) {
    errors.password = 'Password field is required';

  }


  return errors;
};



const Login = () => {
  let {push} = useHistory();

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [notification, notificationError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (notification) {
       setTimeout(() => {
        notificationError(false)
      }, 4000);
    }
  }, [notification])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,

    onSubmit: values => {
       setLoading(true);
         push('/dashboard');
      //     window.location.reload(false);
          
      // const data = {
      //   emailOrMobile: values.email,
      //   password: values.password
      // }
      // axiosInstance.post('dashboard/user/login', data)
      //   .then(res => {
      //     localStorage.setItem('token', res.data.accessToken);
      //     push('/dashboard');
      //     window.location.reload(false);

      //   })
      //   .catch((error) => {
      //   console.log(error.response);
      //   if(error.response.status === 401)
      //   {
      //     notificationError(error.response.data.message)
      //   }
      //     setLoading(false);
      //   });
    },
  });


  return (
    <>
      <section className="login-block">
    <div className="container containers ">
  <div className="row">
    <div className="col-md-4 login-sec">
        <h2 className="text-center">Login Now</h2>

         <form className="login-form" onSubmit={formik.handleSubmit}>
           {notification ? (
                <h5 className="error text-center">{notification}</h5>
              ) : null}
  <div className="form-group">
    <label htmlFor="exampleInputEmail1" className="text-uppercase">Username</label>
     <input type="text"
                    className="form-control"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    autoComplete="off"
                    placeholder="Enter email" />
                      {formik.touched.email && formik.errors.email ? (
                  <div> <small className="error">{formik.errors.email}</small></div>
                ) : null}
    
  </div>
     
  <div className="form-group">
    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
    <input type="password"
         autoComplete="off"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password} />
                      {formik.touched.password && formik.errors.password ? (
                  <small className="error">{formik.errors.password}</small>
                ) : null}

  </div>

       

  
  
    <div className="form-check">
    <label className="form-check-label">
      <input type="checkbox" className="form-check-input"/>
      <small>Remember Me</small>
    </label>

    {loading ? (
                      <Spinner className="float-right" animation="border" role="status">
                      </Spinner>
                    ) : ( <button type="submit" className="btn btn-login btn-primary float-right">Submit</button>)
                    }

   
  </div>
  <div className="d-flex mt-2 justify-content-left links">
       <Link to='/forgot-password'>forgot password?</Link>
   </div>
  
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

  )
}
export default Login;
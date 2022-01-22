import React, { useState, useEffect } from 'react';
import './LoginStyle.css'
import { FaUserAlt } from "react-icons/fa";
import { useFormik } from 'formik';
import axiosInstance from "../Helpers/Axios";
import { Link } from 'react-router-dom';
import { Spinner,Carousel } from 'react-bootstrap';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email field is required';
  }


  return errors;
};

const ForgetPassword = () => {
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const [result,setResult]=useState('');
  const [BackendError, setBackendError] = useState('');
  const [seconds, setSeconds] = React.useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (BackendError) {
     setTimeout(() => {
        setBackendError(false)
      }, 9000);
    }
  }, [BackendError])

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,

    onSubmit: values => {
      setLoading(true);
     
      const data = {
        email: values.email,

      }
      axiosInstance.post('dashboard/user/forget', data)
        .then(res => {
          setLoading(false);
          if (res.status === 200) {
            setResult(res.data.message);

          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 404) {
            setBackendError(error.response.data.message);
          }
        });
    }
  });

  return (
    <>
       <section className="login-block">
    <div className="container containers ">
  <div className="row">
    <div className="col-md-4 login-sec">
        <h2 className="text-center">{result ?"Congratulation": "Forgot Password ? "}</h2>

         <form className="login-form" onSubmit={formik.handleSubmit}>
           {BackendError ? (
                <p className="error  text-center">{BackendError}</p>
              ) : null}

        {
          result ?( <p class="text-success text-center">{result}</p>) :

            (  

      <div>
     <div className="form-group">
               <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                       <input type="text"
                        className="form-control"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        autoComplete="off"
                        placeholder="Enter your email to continue" />
                          {formik.touched.email && formik.errors.email ? (
                      <div> <small className="error">{formik.errors.email}</small></div>
                    ) : null}
        
      </div>

       <div className="form-check">
    {loading ? (
                      <Spinner className="float-right" animation="border" role="status">
                      </Spinner>
                    ) : ( <button type="submit" className="btn btn-login btn-primary float-right">Submit</button>)
                    }

   
  </div>

      </div>
      )
    }
  
   
  <div className="d-flex mt-2 justify-content-left links">
            <Link to='/' className="btn btn-login btn-success float-right" >Login</Link>

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
export default ForgetPassword;
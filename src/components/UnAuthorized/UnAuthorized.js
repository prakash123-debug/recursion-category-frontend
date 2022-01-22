import React from 'react'
import {FaExclamationTriangle} from "react-icons/fa";

const UnAuthorized = () => {
    return (
        <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="error-template text-center">

                  <FaExclamationTriangle style = {{height:"100px", width:"100px",color:"tomato"}}/>
                    <h1>Oops!! 403 Unauthorized access</h1>
                    <h2>We are Sorry</h2>
                    <div className="error-details">
                    The page you're trying to access has restricted access. please refers to your system administrator
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default UnAuthorized

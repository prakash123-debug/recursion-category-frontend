import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axiosInstance from "../Helpers/Axios"
import { baseLink } from "../Helpers/Axios"
import { Link } from 'react-router-dom';
import './ProfileStyle.css'
import { BsPencil } from "react-icons/bs"

const Profile = () => {
  const [data, SetData] = useState([]);

  useEffect(() => {
    if (localStorage.token) {
      const access_token = localStorage.token;
      var decoded = jwt_decode(access_token);
      const userId = decoded.id;
      axiosInstance.get(`/dashboard/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${access_token}`
        }
      })
        .then(res => {
          SetData(res.data);

        })
        .catch((error) => {
          console.log(error);
        });
    }

  }, [])


  if (localStorage.token) {
    return (
      <div className="container profilesContainer">
        <div id="content" className="content p-0">
          <div className="profile-header">
            <div className="profile-header-cover"></div>
            <div className="profile-header-content">
              <div className="profile-header-img mb-4">
                {
                  data.profilePicture === null ?
                    (<img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="mb-4" alt="" /> ):
                    (<img style={{ height: "100%" }} src={`${baseLink}${data.profilePicture}`} alt="profile" />)

                }
              </div>

              <div className="profile-header-info">
              <div className="float-left">
                <h4 className="m-t-sm text-center">{data.fullName}</h4>
                <p className="m-b-sm text-center">{data.email}</p>
                </div>
                <div className="float-right">
                <Link to={`/dashboard/user/edituser/${data.id}`}>
                  <button className="btn btn-warning ml-1" data-toggle="tooltip" title="edit">
                    <BsPencil />
                  </button>
                </Link>
                </div>
              </div>
            </div>


          </div>

          <div className="profile-container">
            <div className="row row-space-20">
              <div className="col-md-12 hidden-xs hidden-sm">
                <div className="row">
                  <div className="title col-md-12 text-center">PERSONAL INFORMATION</div>

                  <div className="col-md-4 mt-3">
                    <div className="field">Date Of Birth:</div>
                    <div className="text-muted">{data.dateOfBirth}</div>
                  </div>

                  <div className="col-md-4 mt-3">
                    <div className="field">Gender:</div>
                    <div className="text-muted">{data.gender}</div>
                  </div>

                  <div className="col-md-4 mt-3">
                    <div className="field">Address:</div>
                    <div className="text-muted">{data.address}</div>
                  </div>
                </div>

                <div className="row mt-3">

                  <div className="col-md-4">
                    <div className="field">Email:</div>
                    <div className="text-muted">{data.email}</div>
                  </div>

                  <div className="col-md-4">
                    <div className="field">Moblie Number:</div>
                    <div className="text-muted">{data.mobileNumber}</div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }




}

export default Profile;
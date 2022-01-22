import React, { useRef, useState, useEffect } from 'react';
import { useContextSelector } from 'use-context-selector';
import ChangeImage from '../../ChangeImage'
import { HeaderContainer } from '../Sidebar/Sidebar.styles';
import jwt_decode from "jwt-decode";
import axiosInstance from "../Helpers/Axios"
import { Container, Row, Col, Button, Overlay, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {FaPaintBrush,FaImages, FaPowerOff, FaUserAlt,FaUniversalAccess,FaBars,FaSignOutAlt } from "react-icons/fa";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import * as AllColors from '../../colors';
import LogOut from '../Login/LogOut'
import './HeaderStyle.css'

const Header = (props) => {

  const image_sets = [
    "/images/mountain.jpg",
    "/images/flag.jpg",
    "/images/magda.jpg",
    "/images/shamvu.jpg",
    "/images/lumbini.jpg",
    "/images/newari.jpg",
    "/images/umbrella.jpg"
  ];

  const colors_sets = [
    AllColors.dejaVu, ,
    AllColors.swampy, 
    AllColors.pinkAndBlue,
    AllColors.julyBlue, 
    AllColors.preDark,
    AllColors.brown,
    AllColors.silver,
    AllColors.DefaultColor
  ];

  const imageList = useContextSelector(ChangeImage, (context) => {
    return context.imageList;
  })
  const setimageList = useContextSelector(ChangeImage, (context) => {
    return context.setimageList;
  })
  const isSidebarOpen = useContextSelector(ChangeImage, (context) => {
    return context.isSidebarOpen;
  })
  const setSidebarState = useContextSelector(ChangeImage, (context) => {
    return context.setSidebarState;
  })

  const colorList = useContextSelector(ChangeImage, (context) => {
    return context.colorList;
  })
  const setcolorList = useContextSelector(ChangeImage, (context) => {
    return context.setcolorList;
  })


  const [OpenDeleteModal, handleOpenDeleteModal] = useState(false);
  const closeDeleteModalHandler = () => handleOpenDeleteModal(false);
  const [data, SetData] = useState([]);
  const [CurrentStatus, SetCurrentStatus] = useState();


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
  //for dropdown element in header
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);


  const imgdropdownRef = useRef(null);
  const [isImgActive, setisImgActive] = useDetectOutsideClick(imgdropdownRef, false);
  const onImgClick = () => setisImgActive(!isImgActive);

  const colorDropdownRef = useRef(null);
  const [isColorActive, setisColorActive] = useDetectOutsideClick(colorDropdownRef, false);
  const onColorClick = () => setisColorActive(!isColorActive);


  const UpdateTime = () => {
    let time = new Date().toLocaleTimeString();
    let AmOrPm = time.slice(-2);
    if (AmOrPm == 'AM') {
      SetCurrentStatus('Good Morning')
    }
    else {
      SetCurrentStatus('Good Afternoon')
    }

  }
  setInterval(UpdateTime, 1000);

  return (
  
      <HeaderContainer backgroundImage={imageList} isSidebarOpen={isSidebarOpen} colorPalette={colorList} >
<ul className="flex-container space-evenly">
  <li className="flex-item"  data-Toggle="tooltip" title="Collapse"><FaBars  onClick={() => setSidebarState(!isSidebarOpen)}/></li>
  <li className="flex-item" data-Toggle="tooltip" title="Random Colors"><FaPaintBrush onClick={()=>{
    var randColor = colors_sets[Math.floor(Math.random() * colors_sets.length)];
    setcolorList(randColor)}
  } /></li>
  <li className="flex-item"  data-Toggle="tooltip" title="Random Images"><FaImages onClick={()=>{
     var randImg = image_sets[Math.floor(Math.random() * image_sets.length)];
     setimageList(randImg)
  }} />
</li>
  <li className="flex-item"  data-Toggle="tooltip" title="Logout"><FaSignOutAlt onClick={() => { handleOpenDeleteModal(true) }} /></li>
  <li className="flex-item"  data-Toggle="tooltip" title="Manage Role"><Link to="/dashboard/role"><FaUniversalAccess/></Link></li>
  
    <li className="flex-item w-50"  data-Toggle="tooltip" title="User Profile">
    <span className="UserIcon"><FaUserAlt/></span>
         <Link to="/dashboard/profile" className="UserProfile">{data.fullName}</Link>
    </li>
</ul>
<LogOut shows={OpenDeleteModal} close={closeDeleteModalHandler} />

      </HeaderContainer>

  )
}
export default Header;
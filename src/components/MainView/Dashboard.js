import React, { useEffect, useState } from "react";
import * as s from "../../App.styles";
import * as Palette from "../../colors";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { ChangeImageProvider } from "../../ChangeImage";
import axiosInstance from "../Helpers/Axios";
import * as sa from "./MainView.styles";
import jwt_decode from "jwt-decode";

//components
//role


//Tourism App
import Home from "./Home/Home";
import Category from "./CategoryApp/Category/Category";


const Dashboard = ({ history, location, match }) => {
  const [data, setData] = useState([]);
  const backgroundImage = "images/magda.jpg";
  const sidebarHeader = {
    fullName: "Tech",
    shortName: "R&D",
  };

  useEffect(() => {
    if (localStorage.token) {
      const access_token = localStorage.token;
      var decoded = jwt_decode(access_token);
      // console.log("decoded", decoded);
      const userId = decoded.id;
      axiosInstance
        .get(`/dashboard/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${access_token}`,
          },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const menuItems = [
    {
      name: "Home",
      to: `${match.path}`,
      icon: "/icons/home.svg",
      subMenuItems: [],
    },
    {
      name: "categories",
      to: `${match.path}/categories`,
      icon: "/icons/destinations.svg",
      subMenuItems: [
        { name: "Category", to: "/category" },
      ],
    },
   
   
  ];

  const fonts = {
    header: "ZCOOL KuaiLe",
    menu: "Poppins",
  };
  return (
    <>
      <ChangeImageProvider>
        <Header
          backgroundImage={backgroundImage}
          colorPalette={Palette.julyBlue}
        ></Header>
        <s.App>
          <Sidebar
            backgroundImage={backgroundImage}
            sidebarHeader={sidebarHeader}
            menuItems={menuItems}
            fonts={fonts}
            colorPalette={Palette.DefaultColor}
          />
          <div className="container-fluid">
            <sa.MainViewContainer>
              <Switch>
                <Route exact path={`${match.path}`} component={Home} />
             
                <Route
                  exact
                  path={`${match.path}/categories/category`}
                  component={Category}
                />

             
              </Switch>
            </sa.MainViewContainer>
          </div>
        </s.App>
      </ChangeImageProvider>
    </>
  );
};

export default withRouter(Dashboard);

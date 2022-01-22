import React, { useState, useEffect } from "react";
import { createContext } from "use-context-selector";
import * as colorPalette from "./colors.js";
import jwt_decode from "jwt-decode";
import axiosInstance from "./components/Helpers/Axios";

const ChangeImage = createContext();

export const ChangeImageProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarState] = useState(true);
  const [imageList, setimageList] = useState("/images/umbrella.jpg");
  const [colorList, setcolorList] = useState(colorPalette.preDark);
  const [categoryResources, setCategoryResources] = useState({});
  const [PlacesResources, setPlacesResources] = useState({});
  const [subCategoryResources, setsubCategoryResources] = useState({});
  const [TagResources, setTagResources] = useState({});
  const [complainCategoryResources, setcomplainCategoryResources] = useState(
    {}
  );
  const [ComplainResources, setComplainResources] = useState({});
  const [RoleResources, setRoleResources] = useState({});
  useEffect(() => {
    if (localStorage.token) {
      const access_token = localStorage.token;
      var decoded = jwt_decode(access_token);
      const roleId = decoded.roleId;
      axiosInstance
        .get(`/dashboard/role/${roleId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${access_token}`,
          },
        })
        .then((res) => {
          let AllResources = res.data.roleData.resources;
          AllResources.map((resourcesData, index) => {
            if (resourcesData.resourceName === "Category") {
              setCategoryResources(resourcesData.role);
            }
            if (resourcesData.resourceName === "SubCategory") {
              setsubCategoryResources(resourcesData.role);
            }
            if (resourcesData.resourceName === "Tag") {
              setTagResources(resourcesData.role);
            }
            if (resourcesData.resourceName === "Place") {
              setPlacesResources(resourcesData.role);
            }
            if (resourcesData.resourceName === "ComplainCategory") {
              setcomplainCategoryResources(resourcesData.role);
            }
            if (resourcesData.resourceName === "Complain") {
              setComplainResources(resourcesData.role);
            }
            if (resourcesData.resourceName === "Role") {
              setRoleResources(resourcesData.role);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <ChangeImage.Provider
      value={{
        imageList,
        setimageList,
        colorList,
        setcolorList,
        isSidebarOpen,
        setSidebarState,
        categoryResources,
        PlacesResources,
        subCategoryResources,
        TagResources,
        complainCategoryResources,
        ComplainResources,
        RoleResources,
      }}
    >
      {children}
    </ChangeImage.Provider>
  );
};

export default ChangeImage;

import React from "react";
import "./BreadCrumbStyle.css";
import { useHistory } from "react-router-dom";

const breadcrumb = {
  backgroundColor: "transparent",
  borderRadius: "0.37",
};
const Breadcrumb = (props) => {
  const { push } = useHistory();
  function isLast(index) {
    return index === props.crumbs.length - 1;
  }

  const Getselected = (data) => {
    if (data === "Home") {
      push("/dashboard");
    } else if (data === "Nagarpalika") {
      push("/dashboard/nagarpalika");
    } else if (data === "Department") {
      push("/dashboard/nagarpalika/department");
    } else if (data === "TourismApp") {
      push("/dashboard/tourismApp");
    } else if (data === "Introduction") {
      push("/dashboard/nagarpalika/introduction");
    } else if (data === "Places") {
      push("/dashboard/tourismApp/places");
    } else if (data === "User") {
      push("/dashboard/user");
    } else if (data === "ComplainApp") {
      push("/dashboard/complainapp");
    } else if (data === "Complain") {
      push("/dashboard/complainapp/complain");
    } else if (data === "Role") {
      push("/dashboard/role");
    }
  };

  return (
   
    <nav className="mainbody-section nopadding text-center">
      <ol className="breadcrumb" style={breadcrumb}>
        {props.crumbs.map((crumb, ci) => {
          const disabled = isLast(ci) ? "disabled" : "";
          return (
            <button
              key={ci}
              className={`btn btn-link ${disabled} `}
              onClick={() => Getselected(crumb)}
            >
              {crumb}
            </button>
          );
        })}
      </ol>
    </nav>
  );
};
export default Breadcrumb;

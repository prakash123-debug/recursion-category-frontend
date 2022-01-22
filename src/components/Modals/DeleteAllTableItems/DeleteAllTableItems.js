import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axiosInstance from "../../Helpers/Axios";

const DeleteAllTableItems = ({ shows, close, ModalName, ModalId }) => {
  console.log("delete page");
  const store = localStorage.getItem("token");
  const [disabled, changeDisable] = useState(false);
  const [notification, setbackenderror] = useState(false);

  useEffect(() => {
    changeDisable(false);
    if (notification) {
      setTimeout(() => {
        setbackenderror(false);
      }, 600);
    }
  }, [notification]);

  const handleDeleteDatas = () => {
    console.log("modal name and modal id", ModalName, ModalId);
    axiosInstance
      .delete(`/dashboard/${ModalName}/${ModalId}`, {
        headers: {
          Authorization: `token ${store}`,
        },
      })
      .then((res) => {
        changeDisable(true);
        setbackenderror(true);
        setTimeout(() => close(), 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal show={shows} onHide={close} backdrop="static" keyboard={false}>
        {notification ? (
          <div className="m-0 alert w-40 alert-success alert-dismissible">
            <strong>success!</strong> Data Deleted Sucessfully
          </div>
        ) : (
          <div>
            <Modal.Header>
              <Modal.Title>Are You Sure Want To Delete???</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button variant="secondary" onClick={close}>
                close
              </Button>
              <Button
                type="submit"
                onClick={handleDeleteDatas}
                disabled={disabled}
                variant="primary"
              >
                Yes
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DeleteAllTableItems;

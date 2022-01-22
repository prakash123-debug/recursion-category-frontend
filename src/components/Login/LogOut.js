import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const LogOut = ({ shows, close }) => {
  const LogoutData = () => {
    localStorage.removeItem('token');
    window.location.reload(false);
  }

  return (
    <>
      <Modal
        show={shows}
        onHide={close}
        backdrop="static"
        keyboard={false}
      >

        <Modal.Header>
          <Modal.Title>Are You Sure Want To Logout?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            close
          </Button>
          <Button type="submit" onClick={LogoutData} variant="primary">Yes</Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default LogOut

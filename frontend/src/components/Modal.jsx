import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export function CustomModal({
  show,
  handleClose,
  title,
  children,
  handleSave,
  saveButtonText = "Save",
  variant = "success",
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant={variant} onClick={handleSave}>
          {saveButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { removeStep } from "../../../store/actions";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 999,
};

const modalStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#f5f5f5",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  padding: "20px",
  width: "20rem", 
  height: "10rem", 
  zIndex: 1000,
};

const buttonStyle = {
  marginTop: "10px",
  width: "100%",
  borderRadius: "4px",
  transition: "background-color 0.3s",
};

const RemoveStepModal = ({
  owner,
  tutorial_id,
  step_id,
  viewModal,
  currentStep,
  step_length
}) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(viewModal);
  }, [viewModal]);

  const handleOnOk = event => {
    if (step_length > 1) {
      event.preventDefault();
      removeStep(owner, tutorial_id, step_id, currentStep)(firebase, firestore, dispatch).then(() => {
        setVisible(false);
      });
    }
  };

  const handleOnCancel = () => setVisible(false);

  return (
    <div>
      {visible && <div style={overlayStyle} />}
      <Modal open={visible} onClose={handleOnCancel} style={modalStyle}>
        <div>
          <Typography variant="h6" gutterBottom>
            This action cannot be undone!
          </Typography>
          <form onSubmit={handleOnOk}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOnCancel}
              style={buttonStyle}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="error"
              style={buttonStyle}
            >
              Remove
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default RemoveStepModal;

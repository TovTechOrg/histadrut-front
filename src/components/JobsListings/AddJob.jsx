import React from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "./JobForm";
import ConfirmationModal from "../shared/ConfirmationModal";
import "../shared/ConfirmationModal.css";
import { uploadJobDetails } from "../../api/api";

export default function AddJob() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");

  const handleCancel = () => {
    navigate("/jobs");
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await uploadJobDetails(formData);
      setModalMessage(response.message || "Job added successfully!");
      setModalOpen(true);
    } catch (error) {
      alert(error.message || "Failed to add job.");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate("/jobs");
  };

  return (
    <div className="add-job-page">
      <h1 className="page__title">Add a New Job</h1>
      <JobForm onSubmit={handleSubmit} onCancel={handleCancel} submitLabel="OK" pageTitle={null} />
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        title="Success"
        message={modalMessage}
        buttonText="OK"
      />
    </div>
  );
}

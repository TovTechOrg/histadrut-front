import React from "react";
import Modal from "../shared/Modal";
import {
  getTextDirection,
  getTextAlignment,
} from "../../utils/languageDetection";
import "./CandidateModal.css";

const CandidateModal = ({ candidate, onClose }) => {

  
  if (!candidate) return null;

  // Get the overview text and detect language
  const overviewText = candidate._metadata?.overview || "No overview available";
  const textDirection = getTextDirection(overviewText);
  const textAlignment = getTextAlignment(overviewText);

  return (
    <Modal
      isOpen={!!candidate}
      onClose={onClose}
      title={candidate.name}
      className="candidate-modal"
    >
      <div className="candidate-modal__info">
        <div className="candidate-modal__score">
          <strong>Match Score:</strong> {candidate.score}
        </div>
        <div className="candidate-modal__mmr">
          <strong>MMR:</strong> {candidate.mmr}
        </div>
        {candidate._metadata?.createdAt && (
          <div className="candidate-modal__matched-at">
            <strong>Matched at:</strong> {new Date(candidate._metadata.createdAt).toLocaleString('en-CA')}
          </div>
        )}
      </div>

      <div className="candidate-modal__overview">
        <h3>Candidate Overview</h3>
        <div
          className="candidate-modal__overview-content"
          dir={textDirection}
          style={{
            textAlign: textAlignment,
          }}
        >
          {overviewText}
        </div>
      </div>

      <div className="candidate-modal__overview">
        <h3>Strengths</h3>
        <div className="candidate-modal__overview-content">
          {candidate._metadata?.strengths && candidate._metadata.strengths.length > 0 ? (
            <ul>
              {candidate._metadata.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          ) : (
            <span>No strengths listed.</span>
          )}
        </div>
      </div>

      <div className="candidate-modal__overview">
        <h3>Weaknesses</h3>
        <div className="candidate-modal__overview-content">
          {candidate._metadata?.weaknesses && candidate._metadata.weaknesses.length > 0 ? (
            <ul>
              {candidate._metadata.weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          ) : (
            <span>No weaknesses listed.</span>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CandidateModal;

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
      {/* Place info bar inside sticky header wrap using a React fragment */}
      <React.Fragment>
        <div className="candidate-modal__info">
          <div className="candidate-modal__score">
            <strong>Match Score:</strong> {candidate.score}
          </div>
          <div className="candidate-modal__mmr">
            <strong>MMR:</strong> <span className={candidate.mmr === 'YES' ? 'candidate-modal__mmr-yes' : 'candidate-modal__mmr-no'}>{candidate.mmr}</span>
          </div>
          {candidate._metadata?.createdAt && (
            <div className="candidate-modal__matched-at">
              <strong>Matched at:</strong> {new Date(candidate._metadata.createdAt).toLocaleString('en-CA')}
            </div>
          )}
        </div>
      </React.Fragment>

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

      <div className="candidate-modal__strweak-flex">
        <div className="candidate-modal__strweak-section">
          <h3 className="candidate-modal__strweak-title">Strengths</h3>
          <div className="candidate-modal__strweak-content">
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
        <div className="candidate-modal__strweak-section">
          <h3 className="candidate-modal__strweak-title">Weaknesses</h3>
          <div className="candidate-modal__strweak-content">
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
      </div>
    </Modal>
  );
};

export default CandidateModal;

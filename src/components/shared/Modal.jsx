import React, { useEffect, useCallback } from "react";
import "./Modal.css";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "600px",
  className = "",
}) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Add event listener for ESC key and prevent body scroll
  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="modal__overlay" onClick={handleOverlayClick}>
      <div className={`modal__content ${className}`} style={{ maxWidth }}>
        <div className="modal__sticky-header-wrap">
          <div className={`modal__header${className && className.includes('no-modal-header-x') ? ' modal__header--x-only' : ''}`}>
            {(!className || !className.includes('no-modal-header-x')) && title && (
              <h2 className="modal__title">{title}</h2>
            )}
            <button
              className="modal__close-btn"
              onClick={onClose}
              aria-label="Close modal"
              style={className && className.includes('no-modal-header-x') ? { marginLeft: 'auto', fontSize: 28, background: 'none', border: 'none', color: '#222', cursor: 'pointer', lineHeight: 1 } : {}}
            >
              ×
            </button>
          </div>
          {/* candidate-modal__info will be rendered here by children */}
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

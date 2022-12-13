/* eslint-disable react/prop-types */
import React from "react";
import "./Modal.css";
function Modal({ active, setActive, children }) {
  return (
    <div
      className={active ? "modal_container active" : "modal_container"}
      onClick={() => setActive(false)}
    >
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
